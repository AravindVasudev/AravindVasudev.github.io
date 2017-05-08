---
title:  "How to create a context menu using JQuery in 3 steps !"
date:   2016-12-08 14:30:00 +0530
categories: [programming]
tags: [web, tricks]
---

Say Google Drive or WhatsApp web or any other web application with native feel,
they all have one thing in common: A Context Menu. A while ago, when I wanted to
add one to my web app, like any other programmer, I binged it (:joy:). Jokes Apart,
to my surprise, I couldn't find a single proper tutorial to do that.

After spending a long time searching, I found a couple of StackOverflow answers
which were in pure JS and CSS (:confounded:). Hence I created this tutorial explaining
how I did it.

Here's my method of doing this using JQuery & Bootstrap (Basic knowledge of HTML,
  CSS and JS is enough for this tutorial)

--------------------------------------------------------------------------------

### Step 1: Include JQuery and Bootstrap

Copy the below lines to the `<head>` section.

<script src="https://gist.github.com/AravindVasudev/57ea11305141188c1af1c53969bbc976.js?file=include-dependencies.html"></script>

### Step 2: Create a Bootstrap Dropdown Menu

Dropdown Menu in Bootstrap is created by making the class of a `<ul>` element `.dropdown-menu`

<script src="https://gist.github.com/AravindVasudev/57ea11305141188c1af1c53969bbc976.js?file=contextmenu.html"></script>

`.context-menu` class is created by us using which we'll add style and script.

### Step 3: Add JQuery contextmenu event

Add the contextmenu event to any block element. If you want this to work throughout the page,
add the event handler to the html and body.

<script src="https://gist.github.com/AravindVasudev/57ea11305141188c1af1c53969bbc976.js?file=contextmenu.js"></script>

### That's it!

Here's the complete solution:
<script src="https://gist.github.com/AravindVasudev/57ea11305141188c1af1c53969bbc976.js?file=index.html"></script>

Finally, style the `.context-menu` to match your site's theme.

### Demo

<p data-height="362" data-theme-id="0" data-slug-hash="JbZJjL" data-default-tab="result" data-user="AravindVasudev" data-embed-version="2" data-pen-title="ContextMenu" class="codepen">See the Pen <a href="http://codepen.io/AravindVasudev/pen/JbZJjL/">ContextMenu</a> by Aravind (<a href="http://codepen.io/AravindVasudev">@AravindVasudev</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
