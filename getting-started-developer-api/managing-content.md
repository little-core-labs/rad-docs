# Managing Content

Check out our custom Rad TV Developer API [chatbot here](https://chatgpt.com/g/g-6745f735b3b481918d77da7ee69af103-rad-tv-developer-api-expert). (free or premium OpenAI account required)

## Working with Content

The Rad TV Developer API provides robust capabilities for managing content within your channel. Using GraphQL mutations, you can create, update, and organize content programmatically.

### Creating Content

To create content, use the `createContent` mutation. This operation requires a `channel` identifier and a `ContentInput` object to specify the content metadata.

#### GraphQL Mutation Example:

```graphql
mutation {
  createContent(
    channel: "did:rad:channel/5678-wxyz",
    input: {
      metadata: {
        name: "Summer Adventure",
        summary: "A video capturing summer memories",
        keywords: ["summer", "adventure", "vacation"]
      }
    }
  ) {
    id
    metadata {
      name
      summary
    }
  }
} 
```

Expected Response:

```json
{
  "data": {
    "createContent": {
      "id": "did:rad:content/abcd-1234",
      "metadata": {
        "name": "Summer Adventure",
        "summary": "A video capturing summer memories"
      }
    }
  }
}
```

### Updating Content

To update existing content, use the `updateContent` mutation. Specify the content ID and the fields to be updated.

#### GraphQL Mutation Example:

```graphql
mutation {
  updateContent(
    id: "did:rad:content/abcd-1234",
    input: {
      metadata: {
        name: "Summer Adventure - Updated",
        summary: "Updated summary for summer memories"
      }
    }
  ) {
    id
    metadata {
      name
      summary
    }
  }
}
```

Expected Response:

```json
{
  "data": {
    "updateContent": {
      "id": "did:rad:content/abcd-1234",
      "metadata": {
        "name": "Summer Adventure - Updated",
        "summary": "Updated summary for summer memories"
      }
    }
  }
}
```

### Best Practices

* **Validate Content Metadata**: Ensure all required fields in the metadata are populated.
* **Handle Errors Gracefully**: Implement error handling for cases like invalid input or insufficient permissions.
* **Organize Content**: Use meaningful names and summaries for easier management and discoverability.
