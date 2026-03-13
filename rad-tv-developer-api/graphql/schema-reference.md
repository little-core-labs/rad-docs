# Schema reference

This page summarizes the main GraphQL types, scalars, and conventions. For the full schema, use introspection against `POST /graphql` or open the Altair playground at `/altair` in development.

## Scalars

| Scalar | Description |
|--------|-------------|
| `DID` | Decentralized identifier URI (e.g. `did:rad.live:channel/<uuid>`, `did:rad.live:content/feature/<id>`) |
| `IngestionID` | Ingestion session identifier |
| `URL` | Fully qualified URL string |
| `DateTime` | RFC 3339 date-time at UTC |
| `Date` | RFC 3339 full-date |
| `Time` | Time string `HH:mm:ss.SSSS` |
| `MimeType` | Internet media type (e.g. `video/mp4`, `image/png`) |
| `JSON` | JSON value |
| `Long` | Integer of at least 52 bits |

## Authentication and public operations

- The schema uses a directive `@auth` on types and fields that require authentication.
- **Public (no auth):** Only `ratings(limit, start)` and `genres(limit, start)` are public. All other queries and all mutations require Bearer auth.

## Nullability

- Fields with `!` are non-null. Nullable fields have no `!`.
- **Lists:** `[T!]!` = non-null list of non-null items; `[T]!` = non-null list that may contain nulls.
- **Content:** `metadata`, `assets`, `likes`, and `commentCount` are never null. `assets` may have empty `videos`/`images` before upload. `transcodeJob` and `outputAssets` are null when not processing or not available.
- **Single-entity queries:** `channel(id)`, `feature(id)`, `stream(id)`, etc. return **null** when the entity is not found or not accessible.

## Main types

| Type | Description |
|------|-------------|
| **Me** | Authenticated user: `id`, `username`, `email`, `channel`, `followedChannels`, `ingestions`, `youtube`, `profile`, `settings`, `subscription`, `credits`, `media`, `wallet` |
| **Channel** | Creator channel: `id`, `metadata`, `assets`, `playlists`, `features`, `series`, `miniseries`, `seasons`, `episodes`, `streams`, `followersCount`, `isFollowed` (no legacy `content` field) |
| **Content** | Media content: `id`, `hints`, `metadata`, `assets`, `outputAssets`, `transcodeJob`, `likes`, `commentCount`, `isCommented`, `comments` |
| **ContentMetadata** | Title, summary, genre, rating, keywords, categories, visibility |
| **ContentLikes** | `count`, `isLiked`; never null (0/false when unauthenticated or on error) |
| **Feature**, **Stream**, **Episode**, **Season**, **Serie**, **Miniseries** | Catalog types; each has `id`, `metadata`, `assets`, `likes`, `commentCount`, `comments`; implement Likeable & Commentable |
| **Category** | `id` (DID), metadata (name, summary, shortSummary), assets |
| **Playlist** | `id`, `metadata`, `assets`, `items(limit, start)` |
| **IngestionSession** | TUS session: `id`, `endpoint`, `metadata`, `progress`, `tus` |
| **Comment** | `id`, `body`, `contentId`, `createdAt`, `author` |
| **OutputAssets** | Encoder output: `encoderType`, `video`, `audio`, `images`, `subtitles`; null when no video or transcoding not done |
| **TranscodeJob** | `id`, `status`, `progress`, `deployed`, `finished`, timestamps |
| **YouTubeConnection** | `connected`, `channelId`, `channelTitle`, `hasUploadScope`, etc. |
| **YouTubeVideo**, **YouTubeVideoList** | Video metadata and paginated list |
| **YouTubePublishJob** | Job `id`, `status`, `progress`, `youtubeVideoId`, `youtubeUrl`, `error` |

## Output assets and thumbnails

After transcoding, query `content.outputAssets` for:

- **video** — `hls`, `download`, `preview` (preview may be null for some encoders)
- **audio** — `download`
- **images** — `thumbnails`, `videoThumbnails` (each is a `ThumbnailSet`: `urlFormat`, `count`)
- **subtitles** — `srt`, `vtt` (null for MediaConvert; present for Rad Encoder)

**ThumbnailSet placeholders:** Expand thumbnails by replacing a placeholder in `urlFormat` with zero-padded indices:

- `XXXXXXX` — 7-digit zero-padded, 0-based index (0 .. count-1). MediaConvert.
- `XX` — 2-digit zero-padded, 1-based index (1 .. count). Rad Encoder.

Two encoder types are supported: `MEDIA_CONVERT` and `RAD_ENCODER`.

## EntityMetadata interface

Many types have a `metadata` field implementing `EntityMetadata`: `name`, `title`, `summary`, `shortSummary`, `keywords`. Use these for consistent display and filtering across channels, content, playlists, and catalog types.

## Key input types

- **ContentInput** — `hints`, `metadata` (ContentMetadataInput)
- **ContentAssetInput** — `filename`, `video` (VideoInput), `image` (ImageInput), `size`
- **ProcessingInput** — `assetName`, `layout` (LANDSCAPE|PORTRAIT|VR), `encoder` (MEDIA_CONVERT|RAD_ENCODER), `enhance`
- **PlaylistInput** — `metadata` (PlaylistMetadataInput)
