---
title: Use Rad TV in Claude and ChatGPT
description: Connect your Rad TV account to Claude or ChatGPT to publish videos, edit details, build playlists, manage comments and check your channel analytics by asking.
---

The Rad TV connector lets an AI assistant work with your own Rad TV account and channel. You ask in plain language, and the assistant uses Rad TV's tools to do it. It asks for your approval before anything that changes your account.

## What you need

- A Rad TV account with an active subscription.
- Claude on any plan (the Free plan allows one custom connector), or a paid ChatGPT plan. On Claude Team and Enterprise, and on ChatGPT Business, Enterprise and Edu, your workspace admin may need to add or allow the connector.
- For the YouTube tools only: a YouTube account connected in Rad TV.

Rad TV is on its way to the Claude and ChatGPT directories. Until it's listed, add it by its address, `https://api.rad.live/mcp`, as shown below.

## Connect in Claude

1. In Claude, open **Customize > Connectors**.
2. Select **Add**, then **Add custom connector**.
3. Name it **Rad TV**, enter `https://api.rad.live/mcp`, and click **Continue**. Keep the sign-in options Claude marks as **Detected**, then click **Add**.
4. Click **Connect**. The Rad TV sign-in page opens. Sign in and approve access.
5. In a chat, turn Rad TV on from **+ > Connectors** if it isn't already on.

On Claude Team and Enterprise plans, an Owner adds the connector under **Organization settings > Connectors**, and each member then connects from **Customize > Connectors**.

## Connect in ChatGPT

1. Go to [chatgpt.com/plugins](https://chatgpt.com/plugins).
2. Select the **+** button, then **Add custom MCP server**.
3. Name it **Rad TV** and enter `https://api.rad.live/mcp` as the server URL. Keep OAuth as the sign-in method.
4. Review the warning, select **I understand and want to continue**, then **Create as a plugin**.
5. Click **Connect**, then sign in to Rad TV and approve access.

ChatGPT renames these menus from time to time. If a step looks different, look for the option to add a custom MCP server or connector and use the same address.

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
