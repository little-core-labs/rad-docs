---
title: Sideload Videos on PS4 and PS VR
description: Copy video files to a USB drive and play them on PS4 or PS VR with Rad TV.
---

The Rad TV app supports the playback of 2D/mono, 3D/stereo, 360°, and 180° videos via an external USB stick or hard drive when you are logged in to your Rad TV account. There are a few simple steps that must be followed to get videos to play back correctly; please read through the instructions below and reach out if you have any questions.

Sideloaded videos can also be viewed in [Offline Mode](https://littlstar.zendesk.com/hc/en-us/articles/360028883451).

### Rad TV Sideloading Tutorial

https://rad.live/watch/feature/1cd684ba-1041-4cf7-8949-271d39a26144/

Sideloading Tutoral on Rad TV

https://www.youtube.com/watch?v=-a-kZZkK-9c

<a id="psvrsideloadinstructions-en-externaldrivesetup"></a>

## External Drive Setup (PlayStation)

1. Format your drive as exFAT or FAT32. **NOTE: This will erase all files on the drive! Ensure you've backed up all important data on your drive before performing this step.**
2. Once formatted, create a folder named "Rad" at the root (top-level directory) of the drive.<br>
   * The name of the folder is case-insensitive
   * All videos need to be placed in this folder or they will not be able to be read by the app.
   * The app supports nested folders inside of the top-level folder.
   * Currently, the app does not automatically detect the layout of the video you are trying to play, so you will either need to set the type inside the application before playing the video [see: [Metadata Settings](https://littlstar.zendesk.com/hc/en-us/articles/360028563652)] or you will need to name your file with the following naming conventions.
   * Folders named "Littlstar" and "Littlestar" should still work, however there have been some reports that some hard drives no longer show up with these names. We recommend changing the folder name to "Rad".

<a id="psvrsideloadinstructions-en-filenamingconventions"></a>

## File naming conventions

There are specific naming conventions to which videos must adhere for the app to automatically recognize the type of video it needs to render. By default, the Rad TV player will attempt to render a **fixed-frame** video. Therefore it is not necessary to explicitly add "ff" to the file name unless it's 3D, in which case "3dff" should be appended to the file name.

<a id="psvrsideloadinstructions-en-180videos"></a>

### 180° Videos

* file name needs to contain "180"

<a id="psvrsideloadinstructions-en-360videos"></a>

### 360° Videos

* file name needs to contain "360"

<a id="psvrsideloadinstructions-en-fixedframevideos"></a>

### Fixed Frame Videos

* file name needs to contain either "3dff" if 3D fixed frame video
* for 3D videos, if each sub-frame is the full resolution, file name needs to contain "FR". (Note: most videos are packed into the frame to be half resolution, so this extension isn't usually needed.)

<a id="psvrsideloadinstructions-en-overunder-topbottomvideos"></a>

### OverUnder/TopBottom Videos

* file name needs to contain either "ou", "tb", or "bt"

<a id="psvrsideloadinstructions-en-sidebyside-leftrightvideos"></a>

### SideBySide/LeftRight Videos

* file name needs to contain either "sbs", "lr" or "rl"

<a id="psvrsideloadinstructions-en-examples"></a>

### Examples:

* myvideo.mp4
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
* myvideo_3dff_ou.mp4
* myvideo_3dff_tb.mp4
* myvideo_3dff_bt.mp4
* myvideo_3dff_sbs.mp4
* myvideo_3dff_lr.mp4
* myvideo_3dff_rl.mp4

<a id="psvrsideloadinstructions-en-thumbnailsandmetadata"></a>

## Thumbnails and Metadata

As of version 1.20, you can add a thumbnail, title, and description information by setting the metadata of the Mp4 file. We utilize the MPEG4 standard for metadata.

In order to add a thumbnail, you must have an existing png or jpg you wish to add. Aspect Ratio is preferred to be 16:9 with a width of 720 pixels or less.

**Setting thumbnails with iTunes**

There are many tools for editing media file metadata. iTunes is a popular tool for this.

1. Open iTunes
2. File → Add Folder to Library
3. Add your Littlstar folder to the Library
4. Library → Movies → Home Videos
5. You should see your Littlstar videos under Home Videos
6. Right-click your target video → Video Info
7. Artwork → Add Artwork, then select a thumbnail to add
8. You can update other metadata within the Video Info dialog as well

**Bulk thumbnails with Mp3tag**

1. Place all your videos and thumbnails in one folder. Each thumbnail should have a name identical to the corresponding video. (eg. MyVideo.mp4 and MyVideo.jpg)
2. Launch Mp3tag
3. File → Change Directory (Browse to the folder from the previous step)
4. Edit → Select All Files
5. Actions (Quick)
6. Import cover from file → Ok
7. Format string for image filename → %_filename%.jpg → Ok

> [!NOTE]
> Mp3tag will remux the mp4 when embedding the jpg image. This can take a while depending on the file size of the mp4.

<a id="psvrsideloadinstructions-en-recommendedsettings"></a>

## Recommended Settings

To ensure proper playback and to be able to support as many videos as possible, we recommend following our encoding guidelines found here: [Media Encoding Guidelines](https://littlstar.zendesk.com/hc/en-us/articles/360030455112)

<a id="psvrsideloadinstructions-en-knownissues"></a>

## Known Issues

* Video files will not load if the video's format extension is not lowercase (IE ".mp4", not ".MP4").
* Multiple USB sticks can cause video reading issues so it is recommended to only use a single drive that has been inserted **before** the application starts.
* Videos should not contain "sbs," "ou," or any of the other phrases above unless they are intended to let the player know which type of video it should try and render.
* Currently, all 3D videos are limited to the same standard mapping, meaning that "sbs", "lr", and "rl" are all equivalent during playback. Videos in "rl" format, (where the right eye texture is placed on the left and the left eye texture is placed on the right), is currently unsupported. Allowing for this flexibility is a feature we hope to implement soon in a future update.
* If you are formatting your drive on macOS, you will need to enable Master Boot Record (MBR), otherwise, your videos may not show up.
* Sometimes formatting your drive on macOS can cause duplicate files on the application, this is a hidden metafile generated by macOS that ends up being recognized by the PlayStation 4. One of these is the actual video and can be played back where the other is not and will not load.
