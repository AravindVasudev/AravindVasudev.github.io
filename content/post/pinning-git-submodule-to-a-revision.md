---
title:  "Pinning Git Submodule To A Revision"
date:   2023-01-18 00:00:00 +0530
categories: [programming]
tags: [git]
---

This blog requires some understanding of git plumbing commands and the basics of
submodules. The resources below are a good start.

* [Git Tools - Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules)
* [Git Internals](https://git-scm.com/book/en/v2/Git-Internals-Plumbing-and-Porcelain)

The submodules chapter within the git book is pretty extensive on how to use
git submodules. However, it misses covering some real-world details.

Recently, I was working on pinning my submodule to a specific revision and
rolling that revision using a script. At first, this seems pretty
straightforward from the documentation. All the information about the
submodules are stored within the `.gitmodules`, which itself is
version-controlled. However, looking deep into the
[structure of the `.gitmodule` file](https://git-scm.com/docs/gitmodules), you
would notice it barely stores any information about your submodule. What's
going on here?

## What's Going On Here?
Let's start with a quick working example. Let's create a project called `root`.

```sh
$ mkdir root && cd root
$ git init
Initialized empty Git repository in [redacted]/root/.git/
```

Now let's add a commit to this with a file.

```sh
# Initially there are no objects.
$ find .git/objects -type f

# Let's add one object.
$ echo "Vanakkam" > foo.txt
$ git add foo.txt
$ find .git/objects -type f
.git/objects/fb/ad2da8dc6369c73410958835e183efd7f81fa1

# Let's commit it. We then would have three objects as expected.
# The file, the tree, and the commit.
$ git commit -m "one"
$ find .git/objects -type f
.git/objects/fb/ad2da8dc6369c73410958835e183efd7f81fa1
.git/objects/3f/2747c176e397abdaf3d9a8d9e338ef91046922
.git/objects/1d/fbe5acff92b9ab9589dbb3ad38c8134f048495
```

Now, let's go ahead and add a submodule to this project. This is where things
start getting interesting.

```sh
# Add wordle-bot as a submodule.
$ git submodule add git@github.com:AravindVasudev/wordle-bot.git
$ git status
On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	new file:   .gitmodules
	new file:   wordle-bot

# The generated .gitmodules stores a record for the submodule.
$ cat .gitmodules
[submodule "wordle-bot"]
	path = wordle-bot
	url = git@github.com:AravindVasudev/wordle-bot.git

# Now, let's commit these changes.
$ git commit -m "two"
[main d302323] two
 2 files changed, 4 insertions(+)
 create mode 100644 .gitmodules
 create mode 160000 wordle-bot

# The .git/objects only has six objects now.
# Two files (foo.txt, .gitmodules), two trees, and two commits.
# It's missing all the objects for the wordle-bot project.
$ find .git/objects -type f
.git/objects/69/fe9cb5d8f4a5d69be2b919069fd23d98c27c41
.git/objects/93/6a915147da8e0f77d2163ca79e457f56b6543a
.git/objects/fb/ad2da8dc6369c73410958835e183efd7f81fa1
.git/objects/3f/2747c176e397abdaf3d9a8d9e338ef91046922
.git/objects/d3/02323142d61ece98a80e740c96f1e0294f2c53
.git/objects/1d/fbe5acff92b9ab9589dbb3ad38c8134f048495

# The tree does not point to any files within wordle-bot, but only a special
# file for the submodule itself.
$ git cat-file -p HEAD^{tree}
100644 blob 936a915147da8e0f77d2163ca79e457f56b6543a	.gitmodules
100644 blob fbad2da8dc6369c73410958835e183efd7f81fa1	foo.txt
160000 commit 4ab3252c6c882050337da221bec585d2705b09d8	wordle-bot
```

If you closely look at the file-mode for the submodule, it's created with a
special `160000` mode. From the documentation,

> a special mode in Git that basically means you’re recording a commit as a
> directory entry rather than a subdirectory or a file.

So where are the objects for the submodule wordle-bot?

```sh
# The .git within the submodule is a file not a directory.
$ cd wordle-bot && cat .git
gitdir: ../.git/modules/wordle-bot

# The path within the .git file stores the objects for that submodule.
$ find .git/modules/wordle-bot/objects -type f
.git/modules/wordle-bot/objects/pack/pack-4384d5306de21839e99a7d68ff9b70d6f3adcf84.pack
.git/modules/wordle-bot/objects/pack/pack-4384d5306de21839e99a7d68ff9b70d6f3adcf84.idx
```
The `.git` within the submodule is a file instead of a directory, which points
to a subdirectory within the main `.git` directory, which holds the objects
for the submodule.

The entry in the tree for the submodule is called a
[gitlink](https://git-scm.com/docs/gitsubmodules). The gitlink entry contains
the object name of the commit that the superproject expects the submodule’s
working directory to be at.

## Pinning submodule to a specific revision

Now, back to the original problem. After analyzing what git does under the hood,
this is pretty straightforward again.

We just have to check out the revision we want the submodule to be pinned to
and commit the super project with the updated gitlink.

```sh
# Update the submodule's revision.
$ cd wordle-bot && git checkout 33fc484ae2d63736e9762eb6f9442295bd5ad971
HEAD is now at 33fc484 Disable chrome logs

# You can see the unstaged changes to the submodule's revision.
$ cd .. && git status
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   wordle-bot (new commits)

no changes added to commit (use "git add" and/or "git commit -a")

# Commit the revision.
$ git add wordle-bot && git commit -m "three"
[main 49f94ec] three
 1 file changed, 1 insertion(+), 1 deletion(-)

# The gitlink now points to the revision we checked out above.
$ git cat-file -p HEAD^{tree}
100644 blob 936a915147da8e0f77d2163ca79e457f56b6543a	.gitmodules
100644 blob fbad2da8dc6369c73410958835e183efd7f81fa1	foo.txt
160000 commit 33fc484ae2d63736e9762eb6f9442295bd5ad971	wordle-bot
```

So long!