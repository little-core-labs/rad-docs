---
title: Use Rad TV in Claude and ChatGPT
description: Connect your Rad TV account to Claude or ChatGPT to publish videos, edit details, build playlists, manage comments and check your channel analytics by asking.
---

The Rad TV connector lets an AI assistant work with your own Rad TV account and channel. You ask in plain language, and the assistant uses Rad TV's tools to do it. It asks for your approval before anything that changes your account.

## What you need

- A Rad TV account with an active subscription.
- A Claude plan that supports connectors, or a ChatGPT account.
- For the YouTube tools only: a YouTube account connected in Rad TV.

## Connect in Claude

1. In Claude, open **Settings > Connectors**.
2. Find **Rad TV** in the directory and click **Connect**. Until the directory listing is live, choose **Add custom connector**, name it Rad TV, and enter `https://api.rad.live/mcp`.
3. The Rad TV sign-in page opens. Sign in and approve access.

## Connect in ChatGPT

1. In ChatGPT, open the apps directory and search for **Rad TV**.
2. Click **Connect**, then sign in to Rad TV and approve access.

## What you can ask

- "What videos are on my Rad TV channel?"
- "Publish this video to my channel as a draft: [link]", then "Is it ready yet?"
- "Publish this video with enhancement on." (Creator+: upscales your video up to 4K and upmixes stereo audio to surround. See [4K Video Upscaling](https://rad.live/docs/getting-started-creators-studios-publishers/4k-video-upscaling/) and [Surround Sound Upmixing](https://rad.live/docs/getting-started-creators-studios-publishers/surround-sound-upmixing-from-stereo-to-5.1-and-7.1).)
- "Change the description of my newest video."
- "Make a playlist called Weekend Picks with my three newest videos."
- "Show the latest comments on my videos."
- "How did my channel do over the last 30 days?"
- "Score this title for my next video." (Creator+)

Video processing takes a few minutes. The assistant reports a video as ready only after Rad TV confirms it.

## Privacy and disconnecting

The connector receives only the requests your assistant sends it, never your conversation. See the AI Assistants and Connectors section of our [Privacy Policy](https://rad.live/privacy-policy/).

To disconnect, remove Rad TV in your assistant's connector settings. To have the assistant sign you out, say "Log me out of Rad TV". To revoke access from our side, contact [support@rad.live](mailto:support@rad.live).

## Developers

Building your own agent or using Claude Code, Cursor or another MCP client? See the [Rad TV MCP developer docs](https://developers.rad.live/docs/mcp/).
