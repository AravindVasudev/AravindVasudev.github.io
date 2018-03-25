---
title:  "Moving to Antergos from Ubuntu"
date:   2017-08-15 1:00:00 +0530
categories: [linux]
tags: [linux]
---

Nine months ago, I decided that I had enough with Windows and planned to 
completely move to GNU/Linux (Yeah, it's not Linux, it's GNU/Linux). 
Since I own only one laptop, I do not prefer distro jumping and needed to 
settle down with something. After googling for a while, I picked Ubuntu.

![](/images/blog/close_windows.jpeg)

Ubuntu, with some fixes and theming, is a really awesome distro to dive into. 
Except for the WiFi issue, which is partially fixable, everything seemed nice 
about it. But, being a developer, I tend to stick with latest releases of my 
development tools and Ubuntu's release cycle wasn't doing it for me. I tried 
using PPAs but after a while, I started adding more and more PPAs that I started
losing count of. I heard a lot about Arch Linux's rolling release but was 
too afraid to break my only computer. After getting suggestions from a friend, 
I decided to finally move to Arch Linux. I was too lazy to install it from scratch so 
chose Antergos instead, which provides an awesome UI for installation. 

![](/images/blog/arch_installation.jpg)

I installed Antergos on my HP Pavilion 15 ( ab032tx ) with GNOME as Desktop 
Environment 5 days back. Here is a list of issues that I faced and fixes:

### 1. Keeps rebooting at boot

I completely nuked my hard disk's content to move to Antergos, only to find that 
I couldn't boot into the system. I was completely pissed off but was able to fix
it with about half an hour of googling. The issue was that Windows was set as 
hard drive boot in UEFI boot order in BIOS. Changing this to Antergos fixes the 
issue(I never thought Windows could be this fucking annoying even after 
removing it). [ [fix](https://forum.antergos.com/topic/6192/antergos-keeps-restarting-at-boot-after-fresh-install/7){:target="_blank"} ]

### 2. Stuck with a blank screen at boot

About half an hour of trying to not go crazy, I booted in only to find a 
blinking cursor. After 3 hours of flipping tables, I finally realized that the 
issue was with my Nvidia graphics card. My graphics card supported Nvidia 
Optimus which allowed the OS to use both the discrete and integrated graphics 
card. To make this work, I had to turn off "Install Graphic Drivers" option during
installation and manually install Nvidia drivers with Bumblebee. [ [fix](https://antergos.com/wiki/it/hardware/bumblebee-for-nvidia-optimus/){:target="_blank"} ]

### 3. WiFi issue

From the day 1 of GNU/Linux, this issue that keeps me reluctant from suggesting it to 
everyone. My laptop came with Realtek RTL8723BE WiFi card which works 
perfectly on Windows, but on GNU/Linux, it is a fucking nightmare. Even though it has partial
fixes, it still has some connecting issues with weak signal and isn't as fast as
in Windows. [ [fix](https://iamjagjeetubhi.wordpress.com/2016/06/19/install-realtek-rtl8723be-wifi-drivers-in-arch-linux/){:target="_blank"} ]

### 4. Cannot enable Natural Scrolling through GNOME settings

For some reason, enabling Natural Scrolling through GNOME settings didn't work.
To fix this, I installed Synaptics input driver and manually configured with the
help of Arch Wiki. [ [fix](https://wiki.archlinux.org/index.php/Touchpad_Synaptics#Natural_scrolling){:target="_blank"} ]

--------------------------------------------------------------------------------

I also had some minor issues like default browser font not supporting certain 
unicode characters which can be fixed by changing the font and was unable to 
created a new partition by taking space from the root. I tried creating the 
partition using GParted by booting it live but that significantly slowed down 
the OS's loading time. So I had to reinstall Antergos and partition the drive 
during installation. 

Even though I had a lot of issues at the beginning, I actually feel happy that I 
moved. Arch Wiki is one of the best GNU/Linux guides that I could find over the 
internet. If you couldn't find something that you want in Arch's official repo, 
I'm pretty sure that it is available in AUR. AUR is so freaking huge that you 
don't have to worry about adding PPAs anymore.

![](/images/blog/intelligent_life_arch_linux.png)

Hope this blog helps users who face the same issues as I did. Since I haven't 
always been a GNU/Linux nerd, I know what issues Windows users face when they to 
move out. I have been already helping out some my friends to move to GNU/Linux and I am
glad to help out more users. If you have any questions or issues, please post 
them in comments. Until then, `keep calm && sudo !!` .