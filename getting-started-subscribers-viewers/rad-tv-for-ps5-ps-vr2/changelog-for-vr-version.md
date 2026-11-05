# Changelog for VR Version

## Letterboxing and Trick Play Support (`v1.4.24`) \[01/31/2025]

Please tell us what you think about this update!

Do you like the addition of Trick Play? While implementing Trick Play support, we also began work on customizable seek durations, which we plan to fully integrate soon. Not only will you be able to customize the seek duration for L1, L2, R1, and R2, but you'll also have the option to decide whether each button seeks or controls Trick Play.

Additionally, we are working on a caching system that will save the last used view configuration to a file, so the next time you open a video, it will automatically load your previous settings. This is especially useful for those who prefer not to rename every file using our tag system or for users who cannot add metadata to an RSS Feed or UPnP/DLNA server. It will also cache the display aspect ratio, so you won't have to manually adjust the display aspect ratio profile every time.

Lastly, we are aware of an issue impacting RSS Feeds. Users have reported that long RSS feeds can cause the player to lock up, requiring a restart before playback resumes. We are actively working on a fix and hope to resolve this in the next patch.

### 🆕 New Features & Improvements

* Added letterbox support, meaning videos are no longer forced to a 16:9 aspect ratio.

![](../../assets/letterboxing_portrait_support.webp "Letterboxing Portrait Support")

![](../../assets/letterboxing_overriding_aspect_ratio.webp "Letterboxing Using Wrong Aspect Ratio")![](../../assets/letterboxing_wrong_aspect_ratio.webp "Letterboxing Overriding Wrong Aspect Ratio")

* Player Controls GUI
  * Improved navigation
  * Replaced seek button icons
  * Added display aspect ratio profile selection for 2dff and 3dff videos (e.g. Original, Half Width, Half Height, 16:9)
    * For 2dff videos, the 'Original' profile should match the intended aspect ratio.
    * 3dff videos are difficult to automatically determine the correct per-eye display aspect ratio due to limitations in both the Sony video player we are using and the general lack of this information in a video file's metadata. These profiles allow users to override the display aspect ratio if needed while we work on finding a better solution.
* Trick Play (fast forwarding and fast rewinding) is now supported
  * Support added to common video files (e.g. .mp4 and .webm) using L2 and R2
    * Stop Trick Play by either manually adjusting the speed back to 1x or use the Play button on your controller or on the GUI.
  * Unsupported by HTTP Live Streaming (HLS) video formats (e.g. HLS/TS (.ts)).
    * If content is HLS, L2 and R2 will seek by 10 seconds
    * This means **Home, VR Home, and Purchased Content menu** content does **not support Trick Play**.
    * All **sideloading and UPnP/DLNA** content should generally **support Trick Play**.
    * **RSS Feeds might support Trick Play**.

### 🐛 Bug Fixes

* Fixed benign exception with keybindings on the Login menu's tab system not being unsubscribed after closing. The exception harmlessly attempted to run no-longer-needed code when the user used the seek button, such as when watching a video.
* Player Controls GUI
  * Fixed play/pause button not updating on initial video start.

### 🛠️ Miscellaneous

* Minor improvements to the menu system
* Swapped Media Preview menu and Player Controls GUI to new menu system

### ⚠️ Known Issues

* Trick Play does not work if the video is paused. We will further investigate this issue.

## Home Menu Overhaul, Redesigns and Loading (`v1.4.2`) \[01/14/2025]

To kick off 2025, we’ve optimized and redesigned several menus, with a special focus on load time improvements. The most notable changes affect the initial app loading flow and the Home menu. As our apps have grown with more content, loading times have increased, but this update introduces significant optimizations to address those delays. While further backend improvements are planned, this update delivers a much smoother experience.

One key enhancement: once logged in, you’ll now reach the Home menu in just a few seconds. Previously, the app would wait to finish querying all content cards before allowing interaction. This change makes loading faster and more transparent, with clearer indicators to show what’s happening behind the scenes.

We’ve also introduced a fresh look for several menus. The redesign features updated visuals with opaque text backgrounds, enhancing readability for users who prefer transparent or partially transparent main backgrounds to enjoy the skybox through the menus.

### 🆕 New Features & Improvements

* Home Menu Overhaul:
  * Added loading indicators for playlist rows and content cards.
  * Optimized the creation process for playlist rows and content cards.
  * Updated the design of content cards, playlist titles, and media preview text sizes.
  * Content card queries now fetch only the first 6 cards per playlist, with additional cards loaded dynamically as you scroll.
* Updated initial app loading flow:
  * Users are no longer required to wear the PS VR2 headset during the initial app loading process.
    * **However, the PS VR2 headset still needs to be powered on, and the play area must be set up during app startup.**
    * After setting up the play area, you can remove the PS VR2 headset during the Privacy Policy & Terms of Service agreement menu, Login menu, and Loading menu. The headset must be worn again after progressing through these menus.
    * This change makes it more convenient to scan QR codes and view the authorization code on your TV/monitor while entering the code on another device.
  * Introduced a redesigned Privacy Policy & Terms of Service agreement menu.
    * Features an updated visual design
  * Revamped Login menu.
    * Fresh new design
    * Added the ability to toggle password visibility.
    * Introduced a QR code that links to `radtv.com/device` for the authorization code login method (currently, the code input is not automated).
    * Added a tab system to switch between authorization code and manual login methods.
    * Improved form validation and checking.
  * Redesigned Loading Menu:
    * The background image is now pre-packaged with the app instead of being downloaded.
    * Removed the need to preload the entire home screen's content before loading.
    * Replaced the progress bar with a loading indicator.
* Updated the design of the VR Home menu.
* Updated the design of the Account menu.
  * Logging out is virtually instantaneous now.
* Optimized and improved loading indicators in the VR Home, Purchased Content, and RSS Feeds menus: indicators now persist at the end of the content until loading is 100% complete.
* Various minor improvements to the menu system, including enhanced auto-selection and navigation.
* Improved the refresh button on the sidebar:
  * It now refreshes the user's incredibly quickly: allowing the app to recognize changes like upgrading to a premium subscription or purchasing content without needing a restart.

### 🐛 Bug Fixes

* Resolved several issues where keybindings were not correctly ignored when text input fields were in focus.
* Fixed multiple cases where keybindings were not appropriately ignored when a menu was locked.
* Locking and unlocking a menu now tracks which child UI elements were interactable and only re-enables those elements upon unlocking. This ensures that elements like the submit button in the manual login tab remain disabled unless the form is valid.
* Fixed navigation on sidebar causing the active menu's content to still be scrolled.
* Purchased content that was marked as premium was not playable on a non-premium account.
* Background layer's customizable transparency was always 100% transparent regardless of settings.
* When logged out it did not disengage the requirement to wear the PS VR2 headset.

### 🛠️ Miscellaneous

* Removed Christmas themed skyboxes.

## Emergency Hot Patch - Library Menu Visibility (`v1.3.25`) \[12/17/2024]

### 🐛 Bug Fixes

* Fixed visibility issues with the Library Menu and its submenus based on user subscription or license.

## Initial Load Improvements (`v1.3.24`) \[12/17/2024]

### 🆕 New Features & Improvements

* Slightly improved initial loading time

### 🐛 Bug Fixes

* Fixed issue where the app could get stuck on initial loading with only the skybox visible, likely caused by an expired authentication token.
* Enhanced error handling to prevent app freezes during initial loading

### ⚠️ Known Issues

* Ongoing investigation into long initial loading times.

## Emergency Hot Patch - Removing HDR Support (`v1.3.21`) \[12/13/2024]

HDR10 support was fixed, but it also made everything render using HDR, including the UI and most importantly SDR content. So we're disabling HDR for now until we can figure how to handle HDR for SDR content.

### 🐛 Bug Fixes

* Temporarily disabling HDR.

## HDR, Navigation Improvements & PS VR2 Controllers Fix (`v1.3.20`) \[12/13/2024]

We’ve made significant improvements to HDR support on PS VR2. The entire app, including the video player, now renders in **HDR10 color**, delivering richer colors, brighter highlights, and a more immersive visual experience. During testing, we noticed that SDR content appeared too bright when converted to HDR, so we adjusted the **luma scale** from the default **100% to 50%** to achieve a more balanced brightness.

We also encountered some challenges with color accuracy, particularly with pinks appearing too white or washed out. The PS VR2 supports the **P3D65 color gamut**, which offers a wider range of colors than sRGB. We tested two approaches — **converting color data to P3D65** and **leaving it unconverted**. While neither approach significantly darkened pinks, we found that **not converting** produced slightly deeper, more natural-looking tones. That said, the difference between the two approaches was subtle, and we acknowledge that we're not color experts.

We’d love to hear your thoughts on these HDR changes. Feedback from users with experience in **color calibration** or **display technology** would be especially valuable. We’re also considering the possibility of allowing users to customize HDR settings directly. While we can’t guarantee it’s technically feasible, we’d like to know if this is a feature you’d be interested in. Let us know what you think!

### 🆕 New Features & Improvements

* The default Navigation Repeat Delay remains unchanged at 0.5s
* The default Navigation Repeat Interval has been increased from 0.1s to 0.2s
* New Navigation Settings:
  * **Navigation Repeat Delay:** The time before repeated navigation begins after holding down an input (like a joystick or D-Pad). For example, after holding the joystick for 0.5s, navigation will start repeating.
  * **Navigation Repeat Interval:** The time between repeated navigation movements after the delay has passed. For example, once the Navigation Repeat Delay has been reached, the system will navigate to the next UI element every 0.2s while the joystick or D-Pad is held down.

### 🐛 Bug Fixes

* The PS VR2 was not correctly configured to receive HDR10 color data.
* Fixed an issue where PS VR2 Sense controllers sometimes wouldn't work or would register a single navigation twice.

## Purchased Content Support & Major Bug Fixes (`v1.3.17`) \[12/11/2024]

### 🆕 New Features & Improvements

* Added Purchased Content to Library Menu
* Added exception reporting
* Added loading indicator to:
  * Purchased Content menu
  * RSS Feeds menu's Home
* Now explicitly notify users if a Library menu is empty. For example, for the sideloading menu, it says no drives detected if none are found.
* Swapped out Fall skybox and added some Christmas and Winter themed skyboxes.

### 🐛 Bug Fixes

* Fixed the HDR10 "green eye" bug. All HDR10 videos should play as expected.
* Previously, after opening certain videos, margins of solid black or repeated rows of pixels would suddenly appear when the player controls auto-hid or the user adjusted the view settings. It was particularly problematic for non-spherical stereoscopic (3dff) videos, where the left eye view would display parts of the right eye view. This issue has been resolved.
* Fixed an issue where a solid magenta would briefly appear at the start of video playback. It now displays solid black instead.
* If a skybox is removed from the library and the selected skybox is no longer available, the system will now default to the first skybox rather than showing no skybox at all.
* Increased the mininum value of dead-zone from 0.125 to 0.25 for PS VR2 Sense controllers to prevent double navigating.

### 🛠️ Miscellaneous

* Introduced a new bootloader scene to manage initialization. Exception reporting now loads before anything else to ensure all issues are captured and reported.

### ⚠️ Known Issues

* The PS VR2 Sense controllers may experience double inputs or no input when using the joysticks for navigation. Until this issue is resolved, we recommend using the DualSense Gamepad or the Media Remote instead.

## RSS and Sideloading Fixes (`v1.3.5`) \[11/22/2024]

RSS has finally been fixed and upgraded to the new look of the sideloading and DLNA/UPnP menus.

### New Features & Improvements

* RSS Feeds menu Improved:
  * Now using look of Sideloading and DLNA/UPnP menus
  * Thumbnail support added

![](../../assets/rss_1.webp "RSS Feeds Example 1")![](../../assets/rss_2.webp "RSS Feeds Example 2")

![](../../assets/rss_3.webp "RSS Feeds Example 3")![](../../assets/rss_4.webp "RSS Feeds Example 4")

### Bug Fixes

* RSS Feeds menu scrolling is fixed. You can now scroll through large RSS Feeds without any issues.
* If you opened a large sideloading folder and scrolled down, then selected the sidebar, then tried to re-select the content of the folder, it broke the scrolling window view. The scrolling window would stay where it was and not re-focus on the newly selected content tile.

### Miscellaneous

* Updated DLNA/UPnP menu's title from "UPnP" to "DLNA/UPnP"
* Improved initial loading such that it's less likely to freeze up
* Fixed a memory leak associated with RSS Feeds menu improvements

### Known Issues

* The sideloading menu scrolling fix noted above is fixed, however, if you navigate to the sidebar and navigate up, it also scrolls the scrolling window up. The scrolling window should only be adjusted when the content tiles are selected, not the sidebar's buttons.

## DLNA/UPnP Support (`v1.3.0`) \[11/20/2024]

Yes, you read that right, DLNA/UPnP support is finally here. These are early days so there will be issues due to the amount of different media server applications all having their own quirks and sheer complexity of DLNA/UPnP. Plex and Jellyfin should be the most reliable as those are what were tested on the most. Please read the [docs](dlna-upnp.md) for more info on DLNA/UPnP, especially if using Jellyfin as that requires special configuration to work.

![](../../assets/dnla_devices.webp "DLNA Devices Example")

![](../../assets/dnla_jellyfin_items.webp "DLNA Jellyfin Items Example")

![](../../assets/dlna_plex_items.webp "DLNA Plex Items Example")![](../../assets/dlna_plex_items_unsupported.webp "DLNA Plex Items Unsupported Example")

![](../../assets/dnla_video_preview.webp "DLNA Video Preview Example")![](../../assets/dlna_video_playback.webp "DLNA Video Playback Example")

### New Features & Improvements

* DLNA/UPnP support added
  * Address bar at top shows where you are—just the like sideloading menu.
  * Thumbnail support for video items and containers
  * Automatic environment settings grabbed from video title
  * Shows exclamation icon over content that is not supported, but still shows thumbnail
  * Access as many media servers as you want

### Bug Fixes

* Parsing bug with UPnP objects that contain a childCount
* Bug where trying to browse a container that does not support browsing now properly shows nothing except parent folder option

### Miscellaneous

* Changed UPnP HTTP User-Agent header to include RadTVPSVR2/{version number}. This was needed such that our Jellyfin DLNA profile had a way to determine it was our app and not something else.

### Known Issues

* Toast notifications sometimes do not show. For example, if a DLNA/UPnP server connection is lost it should show a Toast notification but it has not during in testing.
* UPnP containers that act as options are rather buggy, however, they're still possible to use.
* Turning off a media server while browsing can be buggy, we do not recommend doing that at this moment.

## Minor Improvements & Bug Fixes (`v1.2.32`) \[11/11/2024]

We definitely missed the mark on the player controls with the last patch. After some feedback and bug reports (thank you all!), the controls have been improved and are fully functioning.  We added the ability to pause/play using just the X button. The bug that affected hiding player controls using thumbsticks has also been fixed.

One of the biggest improvements is that you can now rotate the camera using the right joystick on 180° and 360° videos. Technically, as you may notice, this feature actually rotates the sphere or semi-sphere the video plays on, however, referring to this as "camera rotation" is more easily understood. The reason we do not actually rotate the camera is because it keeps the player controls center. If you recenter your PSVR2 it will always be right there front and center not behind you or out of sight.

Finally, we have altered the settings slightly with the addition of camera rotation on spherical videos. Here is the [new controls docs page](controls-for-vr-version.md) and this will be updated if/when we alter anything in the future.

### New Features & Improvements

* Added UI scaling in settings

![](../../assets/ui_scaling_30_degrees.webp "UI Scaling 30 degrees")![](../../assets/ui_scaling_60_degrees.webp "UI Scaling 60 degrees")![](../../assets/ui_scaling_90_degrees.webp "UI Scaling 90 degrees")

![](../../assets/ui_scaling_45_degrees.webp "UI Scaling 45 degrees")![](../../assets/ui_scaling_75_degrees.webp "UI Scaling 75 degrees")

* Within the player controls area we moved the environment settings to its own pop-out window

![](../../assets/player_controls%20%281%29.webp "Player Controls")![](../../assets/player_controls_environment_settings.webp "Player Controls Environment Settings")

* Added ability to rotate camera for 180° and 360° videos
  * Uses the right joystick
  * Added setting in player controls

![](../../assets/player_controls_settings.webp "Player Controls Settings")

* Now the submit button plays/pauses the video if the player controls are not shown
* We have reworked how/when the player controls show:
  * Seeking does not show player controls
  * Navigating up, left, or right show the controls (not down)
* Unified Home and VR home background banners
*   Minor improvements to the video info menu

    * Larger titles will now be fully displayed, however, very long titles will still be truncated
    * Using new fallback thumbnail
    * Minor layout changes

    ![](../../assets/video_info_menu.webp "Video Info Menu")
* Added dead-zone of 0.125 to regular PS5 controller so it's easier to navigate
* Added auto-pause/play
  * If you dismount the VR headset playback automatically pauses
    * Playback automatically resumes when you remount the headset
  * Can enable/disable this feature on the settings menu under the Media Player settings
* Replaced Halloween themed Skyboxes with Fall and Winter themes

![](../../assets/skybox_fall.webp "Skybox Fall")![](../../assets/skybox_winter.webp "Skybox Winter")

### Bug Fixes

* Fixed major memory leak in video player
* We have fixed the bug where the DPad down navigation hid the player controls GUI but not thumbstick down navigation
* Z-fighting was occurring between two background images on the Home screen due to the new UI scaling. Removed the spotlight effect to fix this
* Decreased the dead-zone from 0.5 to 0.125 on PSVR2 Controllers—should make navigation smoother
* If a video receives a runtime error the system will now exit out of the video preventing the app from getting stuck on a black screen. While this is not the ideal solution it will at least prevent the app from getting locked up.

### Known Issues

* The green eye bug is still present in the app. We are working on it, however, we believe the bug to only be occurring on 10-bit videos, not standard 8-bit videos. If you have an 8-bit video where this is happening please report it in Discord or our support email (`support@radtv.com`). Also we believe that if you correctly [name the file using the proper tags](file-naming-conventions.md) it **sometimes** plays correctly.

## Bug Fix (`v1.2.9`) \[10/25/2024]

* The opaque background did not get disable when playing a video causing it to obscure the video.

## Minor Improvement & Bug Fixes (`v1.2.8`) \[10/25/2024]

### New Features & Improvements

* Disabling skybox rotation by default
* Adjusted skybox rotation speed option
  * Range is now limited to 0.25 deg/s to 2 deg/s
  * Starting value is now 0.25 deg/s
  * The step size is now 0.25 deg/s
* Added opaque background image to help readability of text
  * The opacity can be adjusted in the settings if the user prefers a partial or fully transparent background

## Halloween, VR Home, Skyboxes, HDR10 and More (`v1.2.3`) \[10/25/2024]

> [!WARNING]
> There is a memory leak in the video player cleanup. As a result we have found that after watching many videos at some point trying to watch another will immediately boot you out of the video and the app will throw an error. In testing it took watching 60-75 high resolution videos before this happened. Please restart the app if you experience this issue. We are working on an immediate fix.

> [!WARNING]
> 10-bit HDR (HDR10) videos play and are perfectly watchable, however, the colors looked washed out. The PS5 video player has a bug causing colors to display improperly that we are working with Sony Interactive Entertainment to squash. We hope to have a fix soon.
>
> UPDATE: We got an updated shader script from Sony. The colors are looking better, but they still look washed out.

Happy Halloween from the Rad TV team! Get ready for a spooky new update featuring eerie new skyboxes that will chill your bones. Watch your favorite Halloween movie via sideloading in terrifying detail with our new HDR10\* support. Or dive into horror like never before on the all-new VR Home menu, where you can experience creepy VR videos up close!

![](../../assets/halloween_1.webp)![](../../assets/halloween_2.webp)![](../../assets/halloween_3.webp)

### New Features & Improvements

* VR Home
  * Added menu to sidebar
  * Includes just VR content

![](../../assets/vr_home.webp)

* Skybox
  * Skybox added to the app environment
  * Added several skybox settings:
    * Enable/Disable Skybox
    * Change Skybox
    * Enable/Disable Rotation
    * Change Rotation Speed (maybe do not crank it up all the way on a full stomach)
  * Added a handful of skyboxes including some Halloween themes

![](../../assets/skybox_1.webp)![](../../assets/skybox_2.webp)![](../../assets/skybox_3.webp)

* Added support for 10-bit HDR\* content

> [!WARNING]
> 10-bit HDR (HDR10) videos play and are perfectly watchable, however, the colors look washed out. The PS5 video player has a bug causing colors to display improperly that we are working with Sony Interactive Entertainment to squash. We hope to have a fix soon.
>
> UPDATE: We got an updated shader script from Sony. The colors are looking better, but they still look washed out.

* Also while we have not tested this, 12-bit videos may also be unofficially supported and also maybe some other color primaries other than HDR10. Again, this may not be the case, but there is a chance. Maybe give it a try! Please share any feedback about your experience.
* Player controls
  * Most button presses show player controls now
  * Back button now hides the player controls
  * Updated pop-out settings window icons

![](../../assets/player_controls.webp)

* Settings
  * Removed the max resolution, video demux buffer size, and number of buffer frames settings
  * As there seem to be no issues with the higher options for the settings above, we have changed the default settings as follows:
    * 8192x4352 is now the standard max resolution supported, and also the max resolution supported by the player
    * 128 MiB is now the standard video demux buffer size, which is also the max demux buffer size supported by the player
    * 6 frame buffers is now the standard instead of 3
  * New settings menu options widgets are closer to how most games display settings as opposed to a dropdown list

![](../../assets/settings.webp)

* Updated app name to `Rad TV for PS5`
* Updated app icon
* Many minor improvements

### Bug Fixes

* Discovered and fixed a bug with the PS4 video player Unity package that was causing abnormally long compilation times in the Unity Editor.
* The settings system was incorrectly thought to have caused the bug above and the settings system has been altered to be more optimized on startup. We believe this should also solve the black screen bug users have been reporting since the last patch. We have been unable to reproduce the bug in a development environment but we believe the settings system was throwing an exception when trying to repair the previous patches' settings file. So the settings system has been overhauled to prevent exceptions from happening. Even if there is a catastrophic error with the settings system, the app should not get hung up.
* We accidentally included a debug key binding for activating the screen blackout effect used for transitions. This key binding has been removed.
* Over time the skybox rotation speed would slow down.
* Fixed a bug with the player controls caused by navigation system changes
* Many minor bug fixes

### Miscellaneous

* Upgraded Unity version from 2022.3.26f1 to 2022.3.46f1
* Upgraded from PS5 SDK version
* Upgraded PS5 video player version
* Custom navigation systems now interoperate with the native Unity navigation system. Was required for the settings menu's new widgets.
* Skybox rotation now gets reset to 0 after the app closes. Because the Unity skybox system does not make an instance of the skybox material the rotation value persisted between app runs. Git would constantly want to track the updated rotation value.

### Known Issues

* The player controls pop out settings menu has two icons flipped. The Top-Bottom icon actually corresponds to viewing as Side-by-Side and the Side-by-Side icon actually corresponds to viewing as Top-Bottom. So for example if you want to watch a Side-by-Side video and you did not use our file naming conventions then select the Top-Bottom icon instead off the Side-by-Side icon. We are working on an immediate fix for this.
* There is a memory leak in the video player cleanup. As a result we have found that after watching many videos at some point trying to watch another will immediately boot you out of the video and the app will throw an error. In testing it took watching 60-75 high resolution videos before this happened. Please restart the app if you experience this issue. We are working on an immediate fix.

## Navigation Improvements & Additional Settings Options (`v1.1.23`) \[09/30/2024]

This update focused on navigation improvements and additional playback settings within the video player.

We also released [HandBrake presets for 8K](video-encoding.md#presets) and created a [public GitHub repository](https://github.com/little-core-labs/handbrake-presets?tab=readme-ov-file) where users can [post Issues for improvements or suggestions](https://github.com/little-core-labs/handbrake-presets/issues). Users more familiar with video encoding and GitHub can even make additions or modifications by submitting a [pull request](https://github.com/little-core-labs/handbrake-presets/pulls) to have them officially added to our set of presets for PS VR2 or other platforms like PS4, iOS, etc.

### New Features & Improvements

* Major navigation improvements. When leaving a sideloaded video you now go back to the sideloading menu instead of home.
* New settings options:
  * Select demux video buffer size (10 MiB to 128 MiB (default 96 MiB)). Selecting a higher buffer size will result in greater memory usage but will help the video player handle higher bitrate videos more efficiently. This should make video playback smoother overall.
  * Set number of frame buffers (3 or 6 (default 3)). Frame buffer is how many frames of a video will be prepared for presentation prior to viewing. Selecting a higher frame buffer also results in higher memory usage and also contributes to smoother playback.

![](../../assets/settings_menu_additions.png)

### **Bug Fixes**

* When opening the player controls the settings popout menu would show every other time. Now the popout menu only shows if the settings toggle is enabled.
* Many bug fixes and menu changes were required after the navigation improvements. If you notice any weird behavior within menu navigation please report it.
* Fixed an issue with the requires VR overlay screen.

### **Known Issues**

* Some 2dff and 3dff videos can suddenly have margins added to the bottom and right side of the viewing area. This is especially apparent in 3dff content and causes the left image to have part of the right image.

## Settings Menu & Minor UI Improvements (`v1.1.12`) \[09/20/2024]

We were hoping to get out some more improvements this week. Such as fixing the backing out of a sideloaded video taking you to the home screen instead of back to the sideloading menu and allowing the user to resize the UI, however, these should be out next patch.

In the meantime, you'll have higher resolution support and some more UI redesigns/improvements.

Please report bugs and improvements you'd like to see!

### **New Features & Improvements**

* Redesigned the player controls GUI again
  * Added back video title/filename
  * Play/pause icon change
  * Made opaque to help with eye discomfort on stereoscopic videos
  * Rounded edges of background panels

![](../../assets/player_controls_gui_redesign_0.webp "Player Control GUI Redesign 1")![](../../assets/player_controls_gui_redesign_1.webp "Player Control GUI Redesign 2")![](../../assets/player_controls_gui_redesign_2.webp "Player Control GUI Redesign 3")

* Sidebar Menu additions and improvements
  * Replaced icons
  * Added new Settings option
  * Added application version

![](../../assets/sidebar_menu_redesign.webp "Sidebar Menu Redesign")

* Library Menu Improvements
  * Swapped to new Sideloading Menu look

![](../../assets/library_menu_redesign.png "Library Menu Redesign")

* Settings menu added
  * Added option to opt-in to increase the max supported resolution. We have not done much 8K video testing so it's going to be opt-in for right now.
  * Added option to opt-in to forcing stereoscopic videos to be displayed monoscopically while the player controls are shown for eye comfort. The video presentation switches back to stereoscopic once the player controls are hidden. Some people liked this change others dislike it so that is why it is opt-in now.

![](../../assets/settings_menu.png "New Settings Menu")

* Minor navigation improvements

### **Bug Fixes**

* Previous bug of "Uncomfortable to look at player controls GUI while watching a stereoscopic video" seems to be partially fixed in actuality. Some people find this more comfortable others find it annoying and that it does not help make it more comfortable. We changed the player controls GUI to be fully opaque with the previous monoscopic effect in combination to hopefully fix the discomfort. We'll be looking out for users thoughts on the changes to better determine the best solution.
* Fixed player controls GUI displaying a placeholder title name instead of the video title/filename.
* In certain situations the wrong button would be selected automatically then a few frames after it would select a more appropriate button. Now it just chooses  the appropriate button.
* In certain situations the size of the UI could get stuck as the safe area size. Which some people might actually prefer this size but it was cutting off the right part of the UI. I was unable to reproduce this effect, however, it should now be less likely to happen after changing some of the code associated with that. If this happens to you please try clearing the cache of the app.

### **Known Issues**

* There may be a problem with high bitrate videos, in particular when testing a high bitrate 8K video the player froze a few times. I was able to seek past the problematic area but it did happen another time or two on the same video. Could be a problem with the video itself or the video player's demux buffer size is not large enough for high bitrate 8K videos. Needs more testing but we should be adding an option to increase the demux buffer size regardless this in the next patch.
* The player controls popout settings menu only shows every other time you open the controls. Should also be fixed in next patch.

## Bug Fixes (`v1.1.1`) \[09/13/2024]

Just a single bug fix this time. More fixes and improvements coming soon.

### **Bug Fixes**

* Discomfort caused by viewing player controls GUI while watching a stereoscopic video has been resolved. The video now switches to monoscopic while the player controls GUI is shown then switches back to stereoscopic after it's hidden. This is the same solution to this "Depth Conflict" problem we used on PS4 / PS VR. May try a potentially better solution in the future.

## The Sideloading Update (`v1.1.0`) \[09/06/2024]

> [!NOTE]
> Known issue added with this update: when sideloading from a folder with many videos if you start a video sometimes when you go back to the file view it will have a video selected that is off screen. Select the sidebar and navigate back to the videos grid to get the selection back on screen. Here is a [video for reference](../../assets/selection_bug.mp4) and to how to see the selection again.

This update brings an upgrade to the player controls UI as well as some major internal upgrades regarding the menu system.

### **New Features & Improvements**

* Upgraded Sideloading Menu
  * Added multidrive support
  * Complete menu redesign
    * Added address bar
    * Added return to home button
  * Added file view settings menu
  * Hot-plugging and hot-unplugging now better supported

![](../../assets/sideloading_menu_redesign_1.webp "Sideloading Home View")![](../../assets/sideloading_menu_redesign_2.webp "Sideloading Folder View")![](../../assets/sideloading_menu_redesign_3.webp "Sideloading Subfolder View")

![](../../assets/file_view_settings_menu_wip.webp "Sideloading File View Settings")

* Upgrading the player controls GUI
  * Better navigation
  * Redesign of pop-out settings window for video settings
    * Simpler and better looking

![](../../assets/player_controls_gui_redesign.webp)

* Added 3D stereoscopic flat/rectangle support

### **Bug Fixes**

* Resolved an issue preventing stereoscopic configurations from functioning properly
* Added support for WebM containers or in other words file extensions to be recognized as playable content, ensuring visibility in the sideloading and RSS menus
* Addressed an error where the application attempted to load a non-existent thumbnail for sideloaded and RSS content
* Backing out of the sideloading menu showing no drive connected has been fixed
* Root-level videos now show and are playable in sideloading
* Folders with more videos than can be displayed on the screen at once now let you scroll properly
* Auto-hiding the player controls now consistently hides after 7.5 seconds. Note: You can navigate down past the bottom row and it will hide the player controls GUI
* Subscription and License status now correctly show in account menu
* Current time and video duration now correctly get formatted over an hour or a day. Should be able to correctly display a video duration of 365 days or longer
* When closing a video all renderers no longer try and free their textures just the active renderers

## Initial Release (`v1.0.45`) \[09/02/2024]

This is the initial release of the app and considered the starting point for all other updates. It contains the MVP application with many bugs found by our team.
