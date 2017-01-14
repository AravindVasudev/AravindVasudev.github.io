---
layout:     post
title:      "Web Scraping 101 (part 2): Build an Anna University Result Scraper"
date:       2017-01-14 2:51:00 +0530
comments:   true
---

This is the follow up to [Web Scraping 101 : Build a simple web scraper using PHP](/2017/01/13/web-scraping-101/).
If you haven't seen it yet, I'd highly recommend you to read that before continuing.

In this tutorial, we will be building a simple web scraper that extracts result from
Anna University's website. This tutorial is completely for educational purpose.

--------------------------------------------------------------------------------
##AU Scraper

We are going to do this in 3 simple steps:

###Step 1: read the website and create the DOM

Anna University provides a nice little endpoint using which we can view our result
by sending a GET Request.

```
http://aucoe.annauniv.edu/cgi-bin/result/cgrade.pl?regno=
```

If you have gone through the previous post, the below needs no explanation.

<script src="https://gist.github.com/AravindVasudev/807a9860088f1be5489d07b57c18344a.js?file=AUScraper_1.php"></script>

###Step 2: Extract the data

Going through the source of the site, we can see that structure of the site is
pretty messed up. If you have tried running the previous code, you'd have noticed that
it throws many errors at `loadHTML()` line. This is because libxml library used by
PHP internally throws those error when the HTML it recieves is not structured properly.
