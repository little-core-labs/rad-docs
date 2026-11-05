# Tools Reference

All tools require `Authorization: Bearer <api-key>`. Optional arguments can be omitted.

## Identity and user

| Tool                     | Description                                 | Arguments |
| ------------------------ | ------------------------------------------- | --------- |
| `get_me`                 | Current user (id, username, email, channel) | _(none)_  |
| `list_followed_channels` | Channels the authenticated user follows     | _(none)_  |

## Channels

| Tool            | Description              | Arguments                                              |
| --------------- | ------------------------ | ------------------------------------------------------ |
| `get_channel`   | Single channel by DID    | `id` (string) — Channel DID                            |
| `list_channels` | All channels (paginated) | `limit` (number, optional), `start` (number, optional) |

## Catalog

| Tool              | Description                         | Arguments                                                                    | Auth   |
| ----------------- | ----------------------------------- | ---------------------------------------------------------------------------- | ------ |
| `list_categories` | All content categories (paginated)  | `limit` (number, optional), `start` (number, optional)                       | yes    |
| `list_ratings`    | All content ratings (e.g. MPAA, TV) | `limit` (number, optional), `start` (number, optional)                       | **no** |
| `list_genres`     | All content genres                  | `limit` (number, optional), `start` (number, optional)                       | **no** |
| `list_comments`   | Comments for content by DID         | `contentId` (string), `limit` (number, optional), `start` (number, optional) | yes    |

## Content and ingestion

| Tool                            | Description                                             | Arguments                                                                                                                                                                                                                          |
| ------------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `create_content`                | Create new content; returns content id (DID)            | `title` (string, optional), `summary` (string, optional), `type` (FEATURE, LIVE, SERIES, EPISODE, SHORT; default FEATURE)                                                                                                          |
| `create_content_asset`          | Create TUS upload session for content; returns endpoint | `contentId` (string), `filename` (string), `size` (number), `hint` (optional: EQUIRECTANGULAR, NONE, PORTRAIT, CUBEMAP, STEREOSCOPIC, OTHER; default NONE)                                                                         |
| `submit_content_for_processing` | Submit content for transcoding                          | `contentId` (string), `assetName` (string), `layout` (optional: LANDSCAPE, PORTRAIT, VR; default LANDSCAPE), `encoder` (optional: MEDIA\_CONVERT, RAD\_ENCODER; default RAD\_ENCODER), `enhance` (optional boolean; default false) |
| `publish_content`               | Make content public                                     | `id` (string — content DID)                                                                                                                                                                                                        |
| `unpublish_content`             | Revert content to protected                             | `id` (string — content DID)                                                                                                                                                                                                        |

## Playlists

| Tool                    | Description                                  | Arguments                                                                                            |
| ----------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `create_playlist`       | Create playlist                              | `title` (string, optional), `summary` (string, optional), `channel` (string, optional — channel DID) |
| `update_playlist`       | Update playlist metadata                     | `id` (string — playlist DID), `title` (string, optional), `summary` (string, optional)               |
| `create_playlist_asset` | Create TUS upload session for playlist image | `playlistId` (string), `filename` (string), `size` (number, optional)                                |

## Engagement

| Tool               | Description               | Arguments                             |
| ------------------ | ------------------------- | ------------------------------------- |
| `follow_channel`   | Follow a channel          | `channel` (string — channel DID)      |
| `unfollow_channel` | Unfollow a channel        | `channel` (string — channel DID)      |
| `like_content`     | Like content (idempotent) | `id` (string — content DID)           |
| `unlike_content`   | Remove like (idempotent)  | `id` (string — content DID)           |
| `create_comment`   | Create comment on content | `contentId` (string), `body` (string) |

## YouTube

| Tool                          | Description                                        | Arguments                                                                                           |
| ----------------------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `list_youtube_videos`         | User's YouTube videos (requires connected account) | `pageToken` (string, optional), `limit` (number, optional)                                          |
| `get_youtube_publish_job`     | Status of a YouTube publish job                    | `id` (string — job id from publish\_content\_to\_youtube)                                           |
| `create_content_from_youtube` | Create content from a YouTube video                | `videoId` (string), `channel` (string, optional)                                                    |
| `publish_content_to_youtube`  | Publish Rad TV content to YouTube; returns job id  | `id` (string — content DID), `privacyStatus` (optional: PUBLIC, UNLISTED, PRIVATE; default PRIVATE) |

## File upload flow (content)

### Step 1: Call `create_content`

Call `create_content` → get content `id` (DID).

### Step 2: Call `create_content_asset`

Call `create_content_asset` with `contentId`, `filename`, `size` → get `endpoint`.

### Step 3: POST the file to the endpoint

POST the file to `endpoint` with `Authorization: Bearer <api-key>` and `Content-Type: multipart/form-data`.

### Step 4: Call `submit_content_for_processing`

Call `submit_content_for_processing` with `contentId` and `assetName` (filename used in step 2).

### Step 5: Optionally publish

Optionally call `publish_content` with the content `id`.
