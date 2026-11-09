---
title: VR Video File Naming for PS5 and PS VR2
description: >-
  How to name 3D, 180 and 360 video files so Rad TV on PS5 and PS VR2 plays them
  in the right format.
---

There are specific naming conventions to which videos must adhere for the app to automatically recognize the type of video it needs to render. By default, the app will attempt to render a **Rectangle** with a **Monoscopic** projection, therefore, it is not necessary to explicitly append any tags to the file name.

<a id="psvrsideloadinstructions-en-fixedframevideos"></a>

## Content Type

* #### Rectangle
  * This refers to the 'Rectangle' content type setting in the video player settings submenu.
  * This is the default content layout setting in the video player settings submenu, so there is no need to include any tags in the file name for this particular setting.
  * For a stereoscopic rectangle (think 3D movie), add a [Content Layout](#content-layout) tag, for example mymovie_sbs.mp4.
* #### Spherical 180°
  * This refers to the 'Spherical 180°' content type setting in the video player settings submenu.
  * File name needs to contain "180"
* #### Spherical 360°
  * This refers to the 'Spherical 360°' content type setting in the video player settings submenu.
  * File name needs to contain "360"

## Content Layout

* #### Monoscopic
  * This refers to the 'Monoscopic' content layout setting in the video player settings submenu.
  * This is the default content layout setting in the video player settings submenu, so there is no need to include any tags in the file name for this particular setting.
* #### Stereoscopic Top-Bottom
  * This refers to the 'Stereoscopic Top-Bottom' layout type setting in the video player settings submenu.
  * File name needs to contain either "tb", "bt", or "ou".
* #### Stereoscopic Side-by-Side
  * This refers to the 'Stereoscopic Side-by-Side' layout type setting in the video player settings submenu.
  * File name needs to contain either "sbs", "lr" or "rl".

## Examples

* myvideo.mp4
* mymovie_sbs.mp4
* mymovie_tb.mp4
* myvideo_180.mp4
* myvideo_180_ou.mp4
* myvideo_180_tb.mp4
* myvideo_180_bt.mp4
* myvideo_180_sbs.mp4
* myvideo_180_lr.mp4
* myvideo_180_rl.mp4
* myvideo_360.mp4
* myvideo_360_ou.mp4
* myvideo_360_tb.mp4
* myvideo_360_bt.mp4
* myvideo_360_sbs.mp4
* myvideo_360_lr.mp4
* myvideo_360_rl.mp4
