# Goose World Traveler

An interactive web application that generates AI-powered images of a goose on adventures around the world. Built with Hono and Cloudflare Workers.

It serves as example app for the talk at JSWorld 2025. 

## Features

- Generate goose adventure images using AI
- Customize the goose's activity, art style, and color scheme
- View a gallery of all generated goose adventures
- Hono JSX 
-  Introduce Hono Middleware: 
   -Basic authentication for image generation
   -Fiberplane Playground with OpenAPI spec generation
- Leverages the Cloudflare Developer Platform

## Tech Stack

- [Hono](https://hono.dev/)
- Cloudflare Developer Platform:
  - [Cloudflare Workers](https://developers.cloudflare.com/workers/)
  - [Cloudflare D1](https://developers.cloudflare.com/d1/) (SQLite Database)
  - [Cloudflare R2 ](https://developers.cloudflare.com/r2/)(Object Storage)
  - [Cloudflare AI](https://developers.cloudflare.com/workers-ai/)
- TypeScript with JSX (using Hono's JSX runtime)
- [Fiberplane API Playground](https://fiberplane.com/docs/get-started/)

## Prerequisites

- Node.js
- pnpm
- Wrangler CLI
- Cloudflare account with:
  - D1 database
  - R2 bucket
  - AI access (the choosen model in this example requires a paid Cloudflare acount)

## Installation

1. Clone the repository
2. Install dependencies:
```bash
pnpm install
```

3. Set up the D1 database:
```bash
npx wrangler d1 execute goose-world-traveler --command="CREATE TABLE IF NOT EXISTS gooseUser (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, activity TEXT NOT NULL, color TEXT NOT NULL, artStyle TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, thumbnail_key TEXT NOT NULL);"
```
After creating the database, update the `wrangler.jsonc` file with the database id.

```
 "d1_databases": [
    {
      "binding": "DB",
      "database_name": "goose-world-traveler",
      "database_id": "your-db-id"
    }
  ],

```

4. Configure your environment variables in `.dev.vars`:
```
TOKEN=your_token
SECRET=your_secret
```

## Development

```
pnpm dev:wrangler
```

## Deployment

Deploy to Cloudflare Workers:

```bash
pnpm deploy
```

## API Routes

- `GET /` - Gallery page showing all generated images
- `GET /info` - Information about how the application works
- `GET /start` - Protected page for generating new goose adventures
- `POST /api/generate` - API endpoint for generating goose images
- `GET /openapi.json` - OpenAPI specification