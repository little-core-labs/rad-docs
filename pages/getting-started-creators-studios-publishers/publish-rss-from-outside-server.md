---
title: Publish RSS From Outside Server
---

Publishers, Content Owners, Studios, and Creators can easily create On Demand TV channels, Live TV, Movie Channels, FAST syndication, OTT channels, and any type of video or streaming channel in no time using Rad TV's RSS / MRSS feed support. No need to build and maintain your own apps on PlayStation, Android TV, Apple TV, iOS, Apple Vision Pro, Android Mobile, Android TV, Amazon Fire, or Meta Quest. You can even run your own ads through these channels.

Simply generate the XML with your web servers, have the XML elements point to your hosted videos and metadata, and give your users the link to add to their Rad TV Premium account. Create a channel using video hosted remotely on your own servers by creating an RSS feed using [Rad TV's specs below](/docs/getting-started-creators-studios-publishers/publish-rss-from-outside-server/#rssfeeds-en-elements).

Rad TV's RSS integration allows publishers to launch a streaming channel on Smart TVs, Mobile, PlayStation and VR in a matter of minutes. You only need video hosting and metadata for their video content and it can be made available instantly to Rad TV's apps without the publisher needing to build and maintain apps across devices, saving millions of dollars in overhead.

Publishers using Rad TV's RSS integration can deliver nearly any kind of content or subject matter, and your users can simply add that feed to their account for viewing on Rad's apps.

Rad TV has extended RSS 2.0 with a Littlstar namespace, as documented below. While we attempt to support other namespaces, please use the Littlstar namespace for maximum compatibility.

If you are a content provider and wish to support the Littlstar namespace, follow the guidelines below. If you wish to add additional support for premium feeds that require authentication, please contact [content@rad.live](mailto:content@rad.live)

<a id="rssfeeds-en-elements"></a>

## Elements

* \<title> (The name of the channel)
* \<link> (The link to the website corresponding to the channel)
* \<description> (The description of the channel)
* \<category> (The categories that the channels belong to)
* \<image> (Image to be displayed for the channel. Aspect Ratio should be 16:9 with a width of 720 pixels or less.)
  * \<url> (The url of the image)
  * \<title> (The title of the image. Not currently used but RSS required.)
  * \<link> (The url of the channel’s website. Not currently used but RSS required.)
* \<item> (The section for a single video)
  * \<title> (The name of the item)
  * \<link> (The url of the stream. *Important: this should be a direct link to the video, i.e. mp4/mov*.)
  * \<description> (The description of the item)
  * \<category> (The category of the item)
  * \<ls:duration> (Total running time of video in seconds)
  * \<ls:image> (The url to a thumbnail for the item. Aspect Ratio should be 16:9 with a width of 720 pixels or less.)
  * \<ls:content-type> (360, 180, ff, ar)
  * \<ls:content-layout> (2d, ou, sbs, ou_fr, sbs_fr, hcap, jpg)
  * \<ls:feed> (Boolean indicating if the item's url is another RSS feed, i.e. for categorization or folders.)

## **Content Type**

* *360*: 360 degree video/photo
* *180*: 180 degree video
* *ff*: Fixed-frame video
* *ar:* Augmented Reality video

## **Content Layout**

* *2d*: 2D Video
* *ou*: Over/Under 3D Video (assumes the sub-images of the video are half-resolution and need to be stretched to fill the frame)
* *sbs*: Side-by-side 3D Video (assumes the sub-images of the video are half-resolution and need to be stretched to fill the frame)
* *ou_fr*: Over/Under 3D Full Resolution (each sub-frame is the full resolution and doesn't need to be stretched/scaled)
* *sbs_fr*: Side-by-side 3D Full Resolution (each sub-frame is the full resolution and doesn't need to be stretched/scaled)
* *hcap:* Augmented reality holographic capture video
* jpg: Photo (JPEG)

## **RSS Feed Example:**

```
<rss version="2.0" xmlns:ls="https://www.littlstar.com">
    <channel>
        <title>Example Feed</title>
        <link>http://www.example.com/</link>
        <description>A description of a feed of examples</description>
        <category>News</category>
        <category>Music</category>
        <image>
            <url>https://www.example.com/image.png</url>
            <title>An Example Image Title</title>
            <link>https://www.example.com/</link>
        </image>
        <item>
            <title>The Example Title</title>
            <link>https://www.example.com/video.m3u8</link>
            <description>This is a video of examples</description>
            <category>News</category>
            <ls:duration>182</ls:duration>
            <ls:image>https://www.example.com/image.png</ls:image>
            <ls:content-type>360</ls:content-type>
            <ls:content-layout>ou</ls:content-layout>
        </item>
        <item>
            <title>The Second Example Title</title>
            <link>https://www.example.com/video2.m3u8</link>
            <description>This is a video of a second example</description>
            <category>Music</category>
            <ls:duration>189</ls:duration>
            <ls:image>https://www.example.com/image2.png</ls:image>
            <ls:content-type>ff</ls:content-type>
            <ls:content-layout>2d</ls:content-layout>
        </item>
    </channel>
</rss>
```

<a id="rssfeeds-en-supportedvideoextensions"></a>

## Supported Video Extensions

Links must be direct to the video url and include one of the following extensions:

* .mp4, .mov, .m4v, .m3u8, .mpd

<br>
