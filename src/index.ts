import { Hono } from "hono";
import { serve } from "@hono/node-server";

import { userInputSchema } from "./types";
import { startTemplate } from "./templates/start";
import { infoTemplate } from "./templates/info";
// Middleware section
import { basicAuth } from "hono/basic-auth";
import { createFiberplane } from "@fiberplane/hono"
import { createOpenAPISpec } from "@fiberplane/hono"
import { zValidator } from '@hono/zod-validator'


const app = new Hono();

//Auth middleware for /api/* endpoints
app.use(
  "/api/start",
  basicAuth({
    username: "hono",
    password: "acoolproject",
  })
);

// index page - gallery
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// Explains the game
app.get("/info", (c) => {
  return c.html(infoTemplate());
});

// Returns the HTML Form page
app.get("/api/start", (c) => {
  return c.html(startTemplate());
});

// Generate and store image
app.post("/api/generate", 
  zValidator('json', userInputSchema),
  async (c) => {
    const data = c.req.valid('json');
    const shortId = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const userId = `AMS_${data.name}_${shortId}`;
    
    console.log('Received request:', {
      userId,
      ...data
    });
    
    return c.json({ 
      userId,
      success: true 
    });
  }
);

// OpenAPI specification
app.get("/openapi.json", c => {
  return c.json(createOpenAPISpec(app, {
    openapi: "3.0.0",
    info: {
      title: "Hono API",
      version: "1.0.0",
    },
  }))
})

// Mount Fiberplane explorer
app.use("/fp/*", createFiberplane({
  app,
  openapi: { url: "/openapi.json" }
}))

//Node server
// serve(
//   {
//     fetch: app.fetch,
//     port: 8787,
//   },
//   (info) => {
//     console.log(`Listening on http://localhost:${info.port}`);
//   }
// );

//Cloudflare Workers
export default app;
