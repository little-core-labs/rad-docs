# Video Encoding

## Encoding Quick Tips

{% hint style="warning" %}
Subtitles are not currently supported, with an exception to some graphics based subtitles like PGS. Text based subtitles do not work at all. Subtitles have not been tested much, but there has been a known case of a subtitle stream causing a video to error when tried to play. The video in question used the text-base subtitle codec 'tx3g'. We are unsure if any other subtitle codecs also cause a player decode error as well.
{% endhint %}

Please ensure your content meets these specifications prior to contacting support. Content encoded outside of these specs is not currently supported.

* Max Bitrate of 50Mbps
* Max Bit depth of 10 is officially supported
* Users are experiencing issues with content that has a variable frame rate
* Users are reporting issues with 8k content at 50+ fps
* Users are seeing rad results with 7K content

If your content meets these requirements and you are still experiencing issues please download [MediaInfo](https://mediaarea.net/en/MediaInfo/Download) and post a screenshot of the full metadata tree to our [discord server](https://https/discord.gg/radtv) or send us a DM on [𝕏](https://x.com/radnftv). &#x20;

## Encoding Restrictions <a href="#psvrsideloadinstructions-en-recommendedsettings" id="psvrsideloadinstructions-en-recommendedsettings"></a>

{% embed url="https://docs.google.com/spreadsheets/d/1fT0ahfN2ZQXwSg_N_2pJ-_1IDN-yFTccr9hZwsuIvQ0/pubhtml" %}

{% hint style="info" %}
More specific encoding restrictions for the audio stream could be added, but a general rule of thumb, most AAC configurations should work, just do not use extreme lows or highs with the sample rate. 4 channels is currently the maximum amount supported.
{% endhint %}

## Encoding with HandBrake

[HandBrake](https://handbrake.fr/) is one of the go to tools for re-encoding videos. Another powerful tool is [ffmpeg](https://www.ffmpeg.org/), however, it has a steep learning curve. For that reason we provide some additional tips and resources for HandBrake.

### Presets

HandBrake allows the ability to export and import presets. These presets pre-configure and alter the behavior of some features. We are providing presets as a starting point for you to tune to your available hardware for encoding.

{% embed url="https://github.com/little-core-labs/handbrake-presets/blob/master/PS%20VR2/presets.json" %}
HandBrake Presets for Rad TV for PS VR2
{% endembed %}

{% hint style="success" %}
We now welcome users to contribute to our HandBrake presets! For more details on how to contribute, please visit [our contribution guidelines](https://github.com/little-core-labs/handbrake-presets?tab=readme-ov-file#contributing).
{% endhint %}

{% hint style="info" %}
Unfortunately we do not have any presets at this time for video encoders from AMD and Intel. These are shown as QSV for Intel and AMF for AMD instead of NVENC under the the list of video encoders available on the video settings tab. You can easily open one of the existing presets and change the selected video encoder.  This will alter some settings including the encoder preset, profile, and level. Make sure to change those back to their prior settings. From there you can save the preset by selecting `Preset  > Add Preset`.
{% endhint %}

{% hint style="info" %}
The Anamorphic is set to 'None', so if you want to have anamorphic content working make sure to enable it in the Video tab.
{% endhint %}

### How to Import and Use a Preset

1. Install [HandBrake](https://handbrake.fr/).
2. Download the preset JSON file above.
3. Open HandBrake and press the cancel button or select a video you would like to re-encode.
4. At the top of HandBrake there is a menu bar. Select `Presets > Import from file`. It should open your default file browser and ask you to select which file to import. Find the downloaded preset file and select it.
5. Now that the presets have been imported, you can now select it. Select `Presets > Presets`, put your cursor over it and it will show you a long list of presets. If you select one it will change your encoding configuration. Ours most likely will be at the bottom of the list.

<div><figure><img src="../../.gitbook/assets/Screenshot 2024-08-28 112523.png" alt="" width="375"><figcaption><p>Importing a Preset</p></figcaption></figure> <figure><img src="../../.gitbook/assets/Screenshot 2024-08-28 123610.png" alt="" width="375"><figcaption><p>Using an Imported Preset</p></figcaption></figure></div>

{% hint style="info" %}
There is a trick to force our presets to show at the top of the presets list. Select the first `Presets > Delete Built-In Presets`. Forewarning if you edited the built-in presets you will be losing this data unless you back it up. If you want the built-in presets still you can choose them once again by selecting `Presets > Reset Built-In Presets` and it will add back the built-in presets below the presets you just imported. Another way to do this without deleting the built-in presets and re-adding them is to manually edit the presets.json file located at `%APPDATA%/HandBrake/.`
{% endhint %}

### What Settings are Safe to Change?

If you are new to this and are unsure what is safe to change, we go you covered. All you have to do is change a few settings on the Video Settings tab.

* Encoder Preset: This changes the amount of compression it will try and perform. This also directly affects how long the encoding will take to complete.
*   Quality Subsection

    * Constant Quality: This determines the quality. This can also increase render time but not as much as the encoder preset. This setting also affects the file size.&#x20;

    Constant quality determines a level of quality it will try to encode to. Higher quality results in a larger file. Encoder presets determine how hard it will try to fit more data in the same amount of allotted space. A very fast encoder preset and a lower (higher quality) constant quality could potentially create a video that is larger than its source and then the compression rate would be in the negatives.

    * Avg Bitrate (kbps): This is an alternative to Constant Quality. This allows you to have more control over the final file size of the encoded video. Constant Quality tries to maintain a certain quality regardless of how much space it will take. Average bitrate measured in Kilobits (kb) per second which is similar to Megabytes (MB) per second. 1 MB is equal to 8000 kb. If you have a 30 second video and you want the file size to be around 30 MB you would set the desired average bitrate to be 8000 kbps. You can also use an online unit conversion tool or simply Google [`1MB to kb`](https://www.google.com/search?q=1+MB+to+Kb\&sca_esv=fd83c4a36cb7ae3c\&sca_upv=1\&ei=HF_PZq7SIfzcp84PwNWH2Q4\&ved=0ahUKEwiu0KXom5iIAxV87skDHcDqIesQ4dUDCBA\&uact=5\&oq=1+MB+to+Kb\&gs_lp=Egxnd3Mtd2l6LXNlcnAiCjEgTUIgdG8gS2IyERAAGIAEGJECGLEDGIMBGIoFMgYQABgHGB4yBhAAGAcYHjIGEAAYBxgeMgYQABgHGB4yBhAAGAcYHjIGEAAYBxgeMgYQABgHGB4yBhAAGAcYHjIGEAAYBxgeSIsKUJwIWKsJcAF4AZABAJgBUaABUaoBATG4AQPIAQD4AQGYAgKgAlfCAgoQABiwAxjWBBhHwgINEAAYgAQYsAMYQxiKBZgDAIgGAZAGCpIHATKgB88E\&sclient=gws-wiz-serp) if you do not want to do the math yourself.
    * Multi-Pass Encoding: This causes an encoder to make two passes over the video when you have Avg Bitrate enabled instead of Constant Quality. This will make the final file size closer to the desired average bitrate. Average bitrate with a single pass tries its best to maintain a certain average bitrate but this is difficult to do on the fly and requires a certain amount of hindsight to do well - multi-pass encoding provides this hindsight. One major point to note is that multi-pass encoding can significantly increase the time it takes to encode.
    * Turbo analysis pass: This speeds up the initial pass if you want the final file size to be closer to the desired average bitrate but do not want to wait as long. It will result in a loss of accuracy maintaining the desired average bitrate but is still better than no multi pass encoding at all. Turn this on if you want to save significant time but want a more accurately maintained bitrate.

<figure><img src="../../.gitbook/assets/Screenshot 2024-08-28 112828.png" alt=""><figcaption><p>Settings Safe to Alter Highlighted</p></figcaption></figure>

{% hint style="info" %}
Multi-Pass Encoding is only available for CPU encoding not GPU encoding.
{% endhint %}

{% hint style="warning" %}
We recommend playing around with the encoder presets and constant quality when first beginning to see what works best with your hardware to achieve your desired quality. Cranking the settings or just a single setting to the max will likely not render the desired outcome. However, if you have a newer NVIDIA GPU (RTX 4000 series) we have found that the slowest encoder preset is not too long. Just choose what quality/file size you want by adjusting the Constant Quality and that is all you have to do.
{% endhint %}

### Which Preset Should I Use?

There is a lot to consider when choosing a preset. Does your content have HDR? Does the hardware you're encoding with have a GPU with a dedicated video encoder on it? How long do you want to wait?

<figure><img src="../../.gitbook/assets/Screenshot 2024-08-28 123841.png" alt=""><figcaption><p>Rad TV for PS5 / PS VR2's HandBrake Presets</p></figcaption></figure>

* Picking between a CPU and GPU NVENC preset is probably the least complex task. If you have an NVIDIA GPU, anything better/newer than the GTX 750 from 2015 should be able to do H.264 or H.265 NVENC. If you are able to use a NVENC and there is not a large time gap between the release of your GPU from your CPU it is highly recommended that you only use the NVENC presets. At the cost of (maybe) slightly worse quality and compression rates to actually being better than a CPU encode in a fraction of the time, NVENC is a significant time saver. Here is a resource to determine [if your NVIDIA GPU supports NVENC](https://help.elgato.com/hc/en-us/articles/360027954992-Which-NVIDIA-graphic-cards-do-support-NVENC-technology).
* At this time we do not offer any presets for video encoders from AMD or Intel. These are shown as QSV for Intel and AMF for AMD instead of NVENC under the the list of video encoders available on the video settings tab. You can easily make your own presets by copying over values from our presets to your own.
* Presets containing the term H.264 will be the quickest to encode, however, H.265 (a.k.a. High Efficiency Video Coding (HEVC), can provide better quality for the same size file. H.265 is better at compression but often results in longer encoding times if you are using a CPU.
* Presets containing the term "8-bit, Non-HDR" and "10-bit, HDR" are (basically) asking you if you want the final video encoded to support HDR. You only want to do the HDR option if the source video you are using has HDR support itself. Most content generally does not have HDR. If you are inclined to check you can easily check with [VLC Player](https://www.videolan.org/) by opening the source video and going to Tools > Codec Information and seeing if the video stream contains a field called Color Primaries and has the value ITU-R BT.2020.

<figure><img src="../../.gitbook/assets/Screenshot 2024-08-28 130643.png" alt="" width="301"><figcaption><p>VLC Player's Codec Information Window</p></figcaption></figure>

### How Do I Encode A Video?

{% hint style="info" %}
Specifically for our PS5 / PS VR2 application we recommend going to `Tools > Preferences > Output Files` and for the `MP4 File Extension` set it to `Always use MP4`.
{% endhint %}

1. Open HandBrake and when it opens it will ask you to select a source video, do so.
2. After selecting a source video, it should allow you to change settings. Assuming you [imported our presets and selected one](video-encoding.md#how-to-import-and-use-a-preset) using our [preset guide](video-encoding.md#which-preset-should-i-use).
3. If you are new to this only adjust the settings as [laid out here](video-encoding.md#what-settings-are-safe-to-change).
4. Choose a save location like your sideloading external drive, RSS Feed, or DLNA server at the bottom of the application.
5. Hit the Start Encode button at the top or press Add to Queue > then open the Queue (also at the top) and start encoding from the Queue popup menu by pressing the Start Queue button. The queue allows you to queue up multiple videos for encoding all at once before starting and allows you to queue more videos for encoding while it's encoding.

<div><figure><img src="../../.gitbook/assets/Screenshot 2024-08-28 133048.png" alt=""><figcaption><p>Start Encode</p></figcaption></figure> <figure><img src="../../.gitbook/assets/Screenshot 2024-08-28 133204.png" alt=""><figcaption><p>Add to Queue > Queue > Start Queue</p></figcaption></figure></div>
