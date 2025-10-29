# LiteAPI Map SDK Proxy Server (ElysiaJS + Bun)

This service designed to securely route client requests from the Map SDK to the external LiteAPI.

Its core responsibilities include:

1.  Hiding the secret **LiteAPI API Key** from the frontend.
2.  Bypassing **CORS** restrictions.

## Endpoints

| Path                 | Method | Description                                                                                        |
| :------------------- | :----- | :------------------------------------------------------------------------------------------------- |
| /api/places/:placeId | GET    | Fetches place information, including the Bounding Box (viewport), required for map initialization. |
| /api/hotels/rates    | POST   | Fetches hotels pricing data.                                                                       |

## ️ Technologies

- **Framework:** [ElysiaJS](https://elysiajs.com/) (Web Standard Framework)
- **Runtime:** [Bun](https://bun.sh/)
- **Language:** TypeScript

## Security and Configuration

The server requires sensitive keys to be stored in environment variables.

| Variable              | Description                                                           |
| :-------------------- | :-------------------------------------------------------------------- |
| `LITE_API_SECRET_KEY` | Your secret key for LiteAPI authentication.                           |
| `LITE_API_BASE_URL`   | The base URL for the LiteAPI (e.g., `https://liteapi.travel/api/v1`). |

## Getting Started

### 1. Install Dependencies (Bun)

```bash
bun install
bun dev
```
