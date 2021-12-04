---
title:  "Bootstrapping your vimrc"
date:   2018-08-26 00:00:00 +0530
categories: [programming]
tags: [vim]
---

When I first started with vim, I had trouble understanding how vim configuration worked 
and it was hard for me to use the plain vim. So I had to copy the .vimrc of a friend 
and as time moved, I kept adding over it to a point where my vim started 
slowing down. So, last week I spent some time on rewriting my .vimrc from scratch and I 
made another "light-weight" version of .vimrc and aliased to 'vi' for minor editing in 
my system and for using it in a colleague's / ssh machine. I then realized that I've made
a perfect .vimrc for a novice to build upon. Here, I present to you my sexy and slim .vimrc:

{{< gist AravindVasudev 42c4df8fba9ffb607b3bdff74b711ebe >}}

Though I'd recommend you to add a theme to this as I did in my original [.vimrc](https://github.com/AravindVasudev/dotfiles/blob/master/virc),
this is pretty much enough for learning and to build upon. This is simple, self-contained, 
has a file-explorer mapped to `F2`, can perform fuzzy file search using `:file <pattern>` in 
normal mode, and has a very simple autocompletion using `ctrl + n` in insert mode.

This is based on [secondpass's dotfiles](https://github.com/secondspass/dotfiles/) and this [talk](https://www.youtube.com/watch?v=XA2WjJbmmoM).
Hope this was helpful. So long!