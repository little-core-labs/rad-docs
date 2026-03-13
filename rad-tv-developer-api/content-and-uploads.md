# Content and Uploads

{% stepper %}
{% step %}
### Create content

Create a content item (optionally tied to a channel).

**GraphQL:**

```graphql
mutation {
  createContent(
    input: {
      hints: [{ type: FEATURE, containsAds: NO }]
      metadata: {
        title: "My Video"
        summary: "Video description"
      }
    }
  ) {
    id
    metadata { title }
  }
}
```

**MCP:** Use the `create_content` tool with `title`, `summary`, and `type` (e.g. FEATURE). The response includes the content `id` (DID).

Save the returned `id` (e.g. `did:rad.live:content/feature/<id>`); you need it for the next steps.
{% endstep %}

{% step %}
### Create an ingestion session (TUS)

Request a resumable upload session for the content. You get an **endpoint** to POST the file to.

**GraphQL:**

```graphql
mutation {
  createContentAsset(
    id: "did:rad.live:content/feature/<id>"
    input: {
      filename: "my-video.mp4"
      size: 12345678
      video: { hint: NONE }
    }
  ) {
    id
    endpoint
    metadata { filename originalFilename }
  }
}
```

**MCP:** Use `create_content_asset` with `contentId` (the content DID), `filename`, `size`, and optional `hint` (e.g. NONE, PORTRAIT, EQUIRECTANGULAR).

The response includes `endpoint` (e.g. `https://api.rad.live/ingestion/<session-id>` or your TUS upload URL).
{% endstep %}

{% step %}
### Upload the file

POST the file to the **endpoint** from step 2:

* **Headers:** `Authorization: Bearer <api-key>`, `Content-Type: multipart/form-data`
* **Body:** The file (multipart/form-data)

Resumable uploads use the TUS protocol; the ingestion endpoint may point to a TUS server. Follow the session instructions returned by `createContentAsset` / `create_content_asset`.
{% endstep %}

{% step %}
### Submit for processing

After the file is uploaded, submit the content for transcoding. Use the **same filename** you passed to `createContentAsset` as `assetName`.

**GraphQL:**

```graphql
mutation {
  submitContentForProcessing(
    id: "did:rad.live:content/feature/<id>"
    input: {
      assetName: "my-video.mp4"
      layout: LANDSCAPE
      encoder: RAD_ENCODER
    }
  ) {
    content { id }
    job { id status progress }
  }
}
```

**MCP:** Use `submit_content_for_processing` with `contentId`, `assetName`, and optional `layout`, `encoder`, `enhance`.

You get a **TranscodeJob** with `id`, `status`, and `progress`. Poll the content’s `transcodeJob` (or the job id) until the job is complete.
{% endstep %}

{% step %}
### Output assets

When transcoding is complete, the content’s `outputAssets` field is populated. Query it via GraphQL:

```graphql
query {
  me {
    channel {
      features(limit: 10, start: 0) {
        id
        metadata { title }
        outputAssets {
          encoderType
          video { hls download preview }
          audio { download }
          images {
            thumbnails { urlFormat count }
            videoThumbnails { urlFormat count }
          }
          subtitles { srt vtt }
        }
      }
    }
  }
}
```

* **video** — `hls` (streaming), `download` (MP4), `preview` (may be null for some encoders)
* **audio** — `download`
* **images** — Thumbnails are described by `ThumbnailSet`: `urlFormat` (string with placeholder) and `count`. Replace the placeholder in `urlFormat` with zero-padded indices: `XXXXXXX` = 7-digit 0-based (MediaConvert); `XX` = 2-digit 1-based (Rad Encoder).
* **subtitles** — `srt` and `vtt` URLs (null for MediaConvert; present for Rad Encoder).

See [Schema reference — Output assets and thumbnails](graphql/schema-reference.md#output-assets-and-thumbnails) for details.
{% endstep %}

{% step %}
### Publish (optional)

To make the content public:

**GraphQL:** `publishContent(id: "did:rad.live:content/feature/<id>")`\
**MCP:** `publish_content` with `id` (content DID).

To revert to protected: `unpublishContent` / `unpublish_content`.
{% endstep %}
{% endstepper %}
