import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { UserProfile, AuthenticatedUserInfo, CardData } from "./types";
import { profileTemplate } from "./templates/profile";
import { galleryTemplate } from "./templates/gallery";
// Middleware section
import { basicAuth } from "hono/basic-auth";
import { bearerAuth } from "hono/bearer-auth";
//import { createFiberplane } from "@fiberplane/hono"
//import { createOpenAPISpec } from "@fiberplane/hono"

interface CloudflareBindings {
  AI: Ai;
  DB: D1Database;
  BUCKET: R2Bucket;
  TOKEN: string;
}

const app = new Hono<{ Bindings: CloudflareBindings }>();

// Auth middleware for /api/* endpoints
app.use(
  "/api/start",
  basicAuth({
    username: "hono",
    password: "acoolproject",
  })
);

app.on("POST", "/api/generate", async (c, next) => {
  const bearer = bearerAuth({ token: c.env.TOKEN });
  return bearer(c, next);
});

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
  const userProfile: UserProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    image: "https://i.pravatar.cc/300",
    hobbies: ["reading", "hiking", "photography"],
  };

  return c.html(profileTemplate(userProfile));
});

// Returns the HTML Form page
app.get("/api/start", (c) => {
  const userProfile: UserProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    image: "https://i.pravatar.cc/300",
    hobbies: ["reading", "hiking", "photography"],
  };

  return c.html(profileTemplate(userProfile));
});

// Generate and store image
app.post("/api/generate", async (c) => {
  const { username, location, activity, color } = await c.req.json();

  try {
    // Use AI to generate image
    const prompt = `
    Generate image for a Goose traveling in Amsterdam. The Goose is at ${location}, ${activity}. The image should have a ${color} color scheme. Generate the image in a drawing style.
  `;
    const response = await c.env.AI.run(
      "@cf/bytedance/stable-diffusion-xl-lightning",
      {
        prompt,
      },
      {
        gateway: {
          id: "",
          skipCache: true,
        },
      }
    );
    const arrayBuffer = await new Response(response).arrayBuffer();

    // store in R2 bucket
    const timestamp = new Date().getTime();
    const objectKey = `${username}-${timestamp}.png`;
    await c.env.BUCKET.put(objectKey, arrayBuffer);
    // Insert into database
    await c.env.DB.prepare(
      "INSERT INTO gooseUser (username, location, activity, color, thumbnail_key) VALUES (?, ?, ?, ?, ?)"
    )
      .bind(username, location, activity, color, objectKey)
      .run();

    return new Response(arrayBuffer, {
      headers: {
        "content-type": "image/png",
      },
    });
  } catch (error) {
    console.log(error);
    return c.json({ error: "Failed to generate and store image" });
  }
});

// OpenAPI specification
// app.get("/openapi.json", c => {
//   return c.json(createOpenAPISpec(app, {
//     openapi: "3.0.0",
//     info: {
//       title: "Hono API",
//       version: "1.0.0",
//     },
//   }))
// })

// // Mount Fiberplane explorer
// app.use("/fp/*", createFiberplane({
//   app,
//   openapi: { url: "/openapi.json" }
// }))

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
