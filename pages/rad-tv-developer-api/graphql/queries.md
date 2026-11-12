---
title: Queries
---

All queries are executed via `POST /graphql` with a JSON body. Most require `Authorization: Bearer <token>`.

## Query list

| Query                                        | Auth   | Description                                                                                                  |
| -------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------ |
| `me`                                         | yes    | Current user (channel, followedChannels, ingestions, youtube, profile, subscription, credits, media, wallet) |
| `channel(id: DID!)`                          | yes    | Single channel by DID (null if not found)                                                                    |
| `channels(limit, start)`                     | yes    | All channels (paginated)                                                                                     |
| `categories(limit, start)`                   | yes    | All categories (paginated)                                                                                   |
| `ratings(limit, start)`                      | **no** | All content ratings (e.g. MPAA, TV); public                                                                  |
| `genres(limit, start)`                       | **no** | All content genres; public                                                                                   |
| `comments(contentId, limit, start)`          | yes    | Comments for content by DID                                                                                  |
| `stream(id)` / `streams(limit, start)`       | yes    | Single stream or list (catalog)                                                                              |
| `episode(id)` / `episodes(limit, start)`     | yes    | Single episode or list (catalog)                                                                             |
| `miniserie(id)` / `miniseries(limit, start)` | yes    | Single miniserie or list (catalog)                                                                           |
| `season(id)` / `seasons(limit, start)`       | yes    | Single season or list (catalog)                                                                              |
| `serie(id)` / `series(limit, start)`         | yes    | Single serie (TV series) or list (catalog)                                                                   |
| `feature(id)` / `features(limit, start)`     | yes    | Single feature (content) or list (catalog)                                                                   |
| `youtubeVideos(pageToken, limit)`            | yes    | User's YouTube videos (requires connected account)                                                           |
| `youtubePublishJob(id)`                      | yes    | Status of a YouTube publish job                                                                              |

> [!NOTE]
> Pagination: List queries accept `limit` and `start` (e.g. `channels(limit: 20, start: 0)`). There is no cursor-based pagination in the schema; use `start` as an offset for the next page.

## Single-entity queries

`channel(id)`, `feature(id)`, `stream(id)`, `episode(id)`, `miniserie(id)`, `season(id)`, `serie(id)`, and `youtubePublishJob(id)` return a single object or **null** when the entity is not found or not accessible. Check for null before using the result.
