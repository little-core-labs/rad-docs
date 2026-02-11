# GraphQL Basics

Check out our custom Rad TV Developer API [chatbot here](https://chatgpt.com/g/g-6745f735b3b481918d77da7ee69af103-rad-tv-developer-api-expert). (free or premium OpenAI account required)

## GraphQL Basics

The Rad TV Developer API uses GraphQL, a query language for APIs that allows clients to request only the data they need. This section introduces GraphQL fundamentals and provides examples to help you make your first query.

### What is GraphQL?

GraphQL is a flexible and efficient way to interact with APIs. Instead of multiple endpoints for different data, GraphQL provides a single endpoint where you specify the data structure you need.

#### Key Features of GraphQL:

* **Single Endpoint**: All operations (queries, mutations, subscriptions) are handled at the same endpoint.
* **Customizable Queries**: Request only the fields you need, reducing unnecessary data transfer.
* **Strongly Typed Schema**: The API provides a schema that describes all the available operations and data types.

### GraphQL Operations

#### Queries

Queries are used to fetch data. You specify the exact fields and structures required.

**Example Query: Fetching the Current User**

GraphQL Query:

```graphql
query {
  me {
    id
    username
    email
    channel {
      id
      metadata {
        name
        summary
      }
    }
  }
}
```

Expected Response:

```json
{
  "data": {
    "me": {
      "id": "did:rad:user/1234-abcd",
      "username": "raduser",
      "email": "raduser@example.com",
      "channel": {
        "id": "did:rad:channel/5678-wxyz",
        "metadata": {
          "name": "Rad Channel",
          "summary": "A personal channel for my uploads"
        }
      }
    }
  }
}
```

#### Mutations

Mutations are used to modify data, such as creating content, updating playlists, or uploading assets.

**Example Mutation: Creating Content**

GraphQL Mutation:

```graphql
mutation {
  createContent(
    channel: "did:rad:channel/5678-wxyz",
    input: {
      metadata: {
        name: "My New Content",
        summary: "An exciting new video"
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
        "name": "My New Content",
        "summary": "An exciting new video"
      }
    }
  }
}
```

### Best Practices for Queries

* **Fetch Only Required Fields**: Avoid over-fetching to improve performance.
* **Use Descriptive Queries**: Name your queries/mutations clearly to make debugging easier.
* **Error Handling**: Always handle errors gracefully in your application.
