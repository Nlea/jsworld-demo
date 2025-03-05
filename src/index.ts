import { Hono } from "hono";
import { serve } from "@hono/node-server";

import { userInputSchema, CardData } from "./types";
import { startTemplate } from "./templates/start";
import { infoTemplate } from "./templates/info";
import { galleryTemplate } from "./templates/gallery";
// Middleware section
import { basicAuth } from "hono/basic-auth";
import { bearerAuth } from "hono/bearer-auth";
import { createFiberplane } from "@fiberplane/hono"
import { createOpenAPISpec } from "@fiberplane/hono"
import { zValidator } from '@hono/zod-validator'


interface CloudflareBindings {
  AI: Ai;
  DB: D1Database;
  BUCKET: R2Bucket;
  TOKEN: string;
}

const app = new Hono<{ Bindings: CloudflareBindings }>();

//Auth middleware for /api/* endpoints
app.use(
  "/api/start",
  basicAuth({
    username: "hono",
    password: "acoolproject",
  })
);

// app.on("POST", "/api/generate", async (c, next) => {
//   const bearer = bearerAuth({ token: c.env.TOKEN });
//   return bearer(c, next);
// });

// index page - gallery
app.get("/", async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM gooseUser ORDER BY created_at DESC"
  ).all();
  const resultArray = results as Partial<CardData>[];
  // get the image from R2 bucket
  const cardData = await Promise.all(
    resultArray.map(async (row) => {
      const image = await c.env.BUCKET.get(row.thumbnail_key);
      const arrayBuffer = image && (await image.arrayBuffer());
      const base64 = Buffer.from(arrayBuffer).toString("base64");
      return {
        ...row,
        base64,
      };
    })
  );
  return c.html(galleryTemplate(cardData));
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
    console.log(data);


  try {
    // Use AI to generate image
    const prompt = `
    Generate image for a Goose traveling in Amsterdam. The Goose is in front of ${data.location}, ${data.activity}. The image should have a ${data.colorScheme} color scheme. Generate the image in a ${data.artStyle} style.
  `;
  console.log(prompt);
    const response = await c.env.AI.run(
      "@cf/bytedance/stable-diffusion-xl-lightning",
      {
        prompt,
      },
      // {
      //   gateway: {
      //     id: "",
      //     skipCache: true,
      //   },
      // }
    );
    const arrayBuffer = await new Response(response).arrayBuffer();

    // store in R2 bucket
    const timestamp = new Date().getTime();
    const objectKey = `${data.name}-${timestamp}.png`;
    await c.env.BUCKET.put(objectKey, arrayBuffer);
    
    // Insert into database and get the ID
    const result = await c.env.DB.prepare(
      "INSERT INTO gooseUser (username, location, activity, color, artstyle, thumbnail_key) VALUES (?, ?, ?, ?, ?, ?) RETURNING id"
    )
      .bind(data.name, data.location, data.activity, data.colorScheme, data.artStyle, objectKey)
      .first();
    
    // Convert array buffer to base64 for sending to client
    const base64Image = Buffer.from(arrayBuffer).toString('base64');

    return c.json({ 
      success: true,
      data: {
        id: result.id,
        name: data.name,
        image: `data:image/png;base64,${base64Image}`
      }
    });

  } catch (error) {
    console.log(error);
    return c.json({ error: "Failed to generate and store image" });
  }
});

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
