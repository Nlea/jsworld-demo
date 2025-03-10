import { Hono } from "hono";

import { userInputSchema, CardData } from "./types";

import { Layout } from "./layout";
import { startTemplate } from "./templates/start";
import InfoTemplate from "./templates/info";
import { galleryTemplate } from "./templates/gallery";
// Middleware section
import { basicAuth } from "hono/basic-auth";
import { bearerAuth } from "hono/bearer-auth";
import { createFiberplane } from "@fiberplane/hono";
import { createOpenAPISpec } from "@fiberplane/hono";
import { zValidator } from "@hono/zod-validator";

interface CloudflareBindings {
  AI: Ai;
  DB: D1Database;
  BUCKET: R2Bucket;
  TOKEN: string;
}

const app = new Hono<{ Bindings: CloudflareBindings }>();

//Auth middleware for /start
app.use(
  "/start",
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
  // Get all the data from the database
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM gooseUser ORDER BY created_at DESC"
  ).all();

  const resultArray = results as unknown as CardData[];

  // get the image from R2 bucket
  const cardData = await Promise.all(
    resultArray.map(async (row) => {
      const image =
        row && row.thumbnail_key && (await c.env.BUCKET.get(row.thumbnail_key));
      const imageUrl = image
        ? `data:image/png;base64,${await image
            .arrayBuffer()
            .then((buf) => btoa(String.fromCharCode(...new Uint8Array(buf))))}`
        : "";
      return {
        ...row,
        imageUrl,
      };
    })
  );
  return c.html(galleryTemplate(cardData));
});

// Explains the game
app.get("/info", (c) => {
  // const page = () => (
  //   <Layout>
  //   </Layout>
  // )
  return c.html(
    // <Layout>
    <div></div>
    // <InfoTemplate>
    // </Layout>
  );
});

// Returns the HTML Form page
app.get("/start", (c) => {
  const token = c.env.TOKEN;
  return c.html(startTemplate(token));
});

// Generate and store image
app.post("/api/generate", zValidator("json", userInputSchema), async (c) => {
  const { name, location, activity, artStyle, colorScheme } =
    c.req.valid("json");

  // create a prompt based on the user input
  let artStyplePrompt = "";
  if (artStyle === "lowpoly") {
    artStyplePrompt =
      "The image is rendered in the distinctive low-poly style, using geometric triangular faces and angular shapes to create a modern, digital aesthetic.";
  } else if (artStyle === "vangogh") {
    artStyplePrompt =
      "The image is rendered in the distinctive Van Gogh style, with bold, visible brushstrokes creating a sense of movement and energy throughout the composition.";
  } else if (artStyle === "whiteboard") {
    artStyplePrompt =
      "The image is rendered in a clean whiteboard drawing style with simple lines and minimal shading.";
  }

  try {
    // Use AI to generate image
    const prompt = `A highly detailed image of a goose actively ${activity} in front of ${location}. The goose is clearly engaged in the action, with a dynamic posture and realistic interaction with any objects involved. The scene is composed with a strong foreground focus on the goose, ensuring its motion and intent are unmistakable. The background reflects ${location}, complementing the main action without overpowering it. Rendered in ${artStyle}. ${artStyplePrompt}. The image captures the characteristic techniques of this style, emphasizing texture, color, and form. The color palette focuses on ${colorScheme}, ensuring visual harmony and a distinct artistic mood. `;

    const response = await c.env.AI.run(
      "@cf/black-forest-labs/flux-1-schnell",
      {
        prompt,
      },
      {
        gateway: {
          id: "goose-world-traveler",
          skipCache: true,
        },
      }
    );

    if (!response.image) {
      throw new Error("No image generated");
    }

    const binaryString = atob(response.image);
    // Create byte representation
    const img = Uint8Array.from(binaryString, (m) => m.codePointAt(0) ?? 0);
    console.log("Image generated");

    // store in R2 bucket
    const timestamp = new Date().getTime();
    const objectKey = `${name}-${timestamp}.png`;
    await c.env.BUCKET.put(objectKey, img);
    console.log("Image stored in R2 bucket");

    // Insert into database and get the ID
    const result = await c.env.DB.prepare(
      "INSERT INTO gooseUser (username, location, activity, color, artstyle, thumbnail_key) VALUES (?, ?, ?, ?, ?, ?) RETURNING id"
    )
      .bind(name, location, activity, colorScheme, artStyle, objectKey)
      .first();
    console.log("Data stored in database");

    return new Response(img, {
      headers: {
        "Content-Type": "image/jpeg",
      },
    });
  } catch (error) {
    console.log(error);
    return c.json({ error: "Failed to generate and store image" });
  }
});

// OpenAPI specification
app.get("/openapi.json", (c) => {
  return c.json(
    createOpenAPISpec(app, {
      info: {
        title: "Hono API",
        version: "1.0.0",
      },
    })
  );
});

// Mount Fiberplane explorer
app.use(
  "/fp/*",
  createFiberplane({
    app,
    openapi: { url: "/openapi.json" },
  })
);

export default app;
