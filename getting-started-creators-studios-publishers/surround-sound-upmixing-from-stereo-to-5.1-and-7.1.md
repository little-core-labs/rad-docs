---
description: How to upmix your stereo audio to include 5.1 and 7.1 surround mixes.
---

# Surround Sound Upmixing from Stereo to 5.1 and 7.1

Creators who are [Creator+](https://rad.live/payment/?plan=f3145a1a-312f-47c7-8d32-51a3abf527d9) subscribers can now upmix their videos from stereo to surround sound.

**Upmixing on Rad TV is a straightforward process:**

1. Make sure you are a [Creator+](https://rad.live/payment/?plan=f3145a1a-312f-47c7-8d32-51a3abf527d9) subscriber.
2. Upload a video in the Creator Studio.
3. Select the checkbox to Enhance the content.
4. Click Upload.

The Upmixing process is part of the pre-processing of the video, so the resulting audio tracks are included in the HLS, downloadable .mp4, and the audio only version.

**Additional considerations for Surround Sound Upmixing:**

* Any time Enhance is selected, 3 audio tracks will exist in the resulting file. Stereo, 5.1, and 7.1 surround.
* We try to leave the surround mixes in tact and pass the originals through, so if the input audio is a Dolby 5.1 variant for example, we will try to pass through the Dolby 5.1 variant for the 5.1 track, and create a stereo and 7.1 version from that 5.1 version.
* If the input file has only a 5.1 surround mix, selecting Enhance will create a Stereo and 7.1 mix, and will try to pass through the 5.1 mix.&#x20;
* If the input file has only a 7.1 mix or above, selecting Enhance will create a Stereo, 5.1, and will try to pass through the 7.1 mix.&#x20;

_Bonus: Videos that are uploaded that have a surround mix will get a stereo downmix by default, even if Enhance isn't selected or the option isn't available. This ensures compatibility for web playback, since most web players don't support surround sound._

