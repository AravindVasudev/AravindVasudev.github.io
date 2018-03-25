---
title:  "Undoing screw-ups in Mercurial"
date:   2018-03-26 04:00:00 +0530
categories: [Mercurial]
tags: [Mercurial]
---

In the last three months of using Mercurial at my internship, I have screwed up a lot of times.
From adding wrong files to pushing bad commits, I have done it all. So, as the end of 
my internship is nearing, I'm making a list of fixes that I learned during this journey.   

--------------------------------------------------------------------------------

## Adding all files
Most of us have a muscle memory to do this:

```php
git/hg add .
git/hg commit -m "foo"
git/hg push
```
But if you are working on a legacy codebase which is as old as time itself, you 
will have to look twice for a ignore file before adding everything. Trust me on this,
you don't want to look like a halfwit who is just discovering what a version control is 
at your internship.

But if you have added mindlessly added everything, here is how you undo it:

```php
hg update -C
```

Beware: This removes all uncommitted changes. So backup your changes before you run this.

## Ludicrous Changes
Sometimes we do changes that make us question our own sanity. At times like these, all we 
want is to revert back to the previous commit and pretend like nothing happened. Here is 
how you do that:

### Before Commit
This is easy. you have done something ridiculous but were lucky enough to spot it 
out before committing. Just run this:

```php
hg update -C
```

### After Commit
This is easy too. you have done something ridiculous and you committed. Just run this:

```php
hg strip 'roots(outgoing())'
```

### After Push
This is when you should consider a doctor and another job since doing a half-assed push as 
an intern is the best way to get kicked out. Reverting pushed commits in Mercurial is 
so convoluted that you might find a million different variation of doing it on the web.
Here is the one that worked for me:

```php
hg clone -r [changeset] [repo] [new-directory] # this is much quicker than cloning it from the server
cp [repo]/.hg/hgrc [new-directory]/.hg/
```

Running this, you will end up with a new repo at the given changeset.

--------------------------------------------------------------------------------

And that's pretty much it. Hopefully, this was helpful.