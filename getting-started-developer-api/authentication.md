# Authentication

Check out our custom Rad TV Developer API [chatbot here](https://chatgpt.com/g/g-6745f735b3b481918d77da7ee69af103-rad-tv-developer-api-expert). (free or premium OpenAI account required)

## Getting Started with Authentication

The Rad TV Developer API uses **API keys** for authentication. These API keys are required for all requests to the API and ensure secure communication between your application and the Rad TV platform.

### Authentication Overview

Each API request must include your API key in the `Authorization` header. The API key identifies and authenticates your application with the Rad TV backend.

#### Key Concepts

* **API Key**: A unique string provided to you in your account settings.
* **Bearer Token Format**: The API key is included in the `Authorization` header as a "Bearer" token.

### Steps to Authenticate

#### 1. Generate Your API Key

You can generate your API key by logging into your [Rad TV Premium account](https://rad.live/edit-account) and navigating to the Developer API section. Keep your key secure and do not share it publicly.

#### 2. Include Your API Key in Requests

To authenticate API requests, include your API key in the `Authorization` header using the `Bearer` scheme.

**Example Request**

```javascript
const fetch = require('node-fetch'); // Ensure to install this in Node.js environments

const query = `
  query {
    me {
      id
      username
      email
    }
  }
`;

fetch("https://api.rad.live/graphql", {
  method: "POST",
  headers: {
    "Authorization": "Bearer <your-api-key>",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ query })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

{% code overflow="wrap" %}
```bash
curl 'https://api.rad.live/graphql' -H 'Authorization: Bearer <your-api-key>' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'Origin: https://api.rad.live/graphql' --data-binary '{"query":"query {me {id username email}}","variables":{}}' --compressed
```
{% endcode %}

**Example Response**

```json
{
  "data": {
    "me": {
      "id": "did:rad.live:user/1234-abcd",
      "username": "raduser",
      "email": "raduser@example.com"
    }
  }
}
```

#### 3. Error Handling

Handle cases where the API key might be invalid or missing. Common error responses include:

**Missing or Invalid API Key**

If the `Authorization` header is missing or contains an invalid API key, the API will return:

```json
{
  "errors": [
    {
      "message": "Unauthorized",
      "extensions": {
        "code": "UNAUTHENTICATED"
      }
    }
  ]
}

```

#### 4. Best Practices

* **Keep Your API Key Secure**: Never hardcode your API key into publicly accessible source code or expose it in logs.
* **Use HTTPS**: Always use HTTPS to encrypt your requests and protect your API key.

By following these steps, you can successfully authenticate and start using the Rad TV API.
