import { Hono } from "hono";

import { deleteCookie, getSignedCookie, setSignedCookie } from "hono/cookie";

import { Layout } from "./layout";
import StartTemplate from "./templates/start";
import InfoTemplate from "./templates/info";
import GalleryTemplate from "./templates/gallery";

// Middleware section
import { basicAuth } from "hono/basic-auth";
import { createFiberplane } from "@fiberplane/hono";
import { createOpenAPISpec } from "@fiberplane/hono";
import { zValidator } from "@hono/zod-validator";

import { userInputSchema, CardData } from "./types";

interface CloudflareBindings {
  AI: Ai;
  DB: D1Database;
  BUCKET: R2Bucket;
  TOKEN: string;
  SECRET: string;
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

// index page - gallery
app.get("/", async (c) => {
  // Get all the data from the database
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM gooseUser ORDER BY created_at DESC"
  ).all();

  const resultArray = results as unknown as CardData[];

  const cardData = await Promise.all(
    resultArray.map(async (row) => {
      try {
        if (!row?.thumbnail_key) {
          return { ...row, imageUrl: "" };
        }

        const image = await c.env.BUCKET.get(row.thumbnail_key);
        if (!image) {
          return { ...row, imageUrl: "" };
        }

        const buffer = await image.arrayBuffer();
        const bytes = new Uint8Array(buffer);
        const base64 = btoa(
          Array.from(bytes)
            .map((byte) => String.fromCharCode(byte))
            .join("")
        );

        return {
          ...row,
          imageUrl: `data:image/png;base64,${base64}`,
        };
      } catch (err) {
        console.error(`Error processing image for ${row.thumbnail_key}:`, err);
        return { ...row, imageUrl: "" };
      }
    })
  );
  return c.html(
    <Layout
      buttonText="Generate New Adventure"
      buttonNav="start"
      subtitle="Gallery"
    >
      <GalleryTemplate data={cardData} />
    </Layout>
  );
});

// Explains the game
app.get("/info", (c) => {
  return c.html(
    <Layout
      buttonText="Generate New Adventure"
      buttonNav="start"
      subtitle="How it works"
      footerBottom
    >
      <InfoTemplate />
    </Layout>
  );
});

// Returns the HTML Form page
app.get("/start", async (c) => {
  const token = c.env.TOKEN;
  const secret = c.env.SECRET;
  await setSignedCookie(c, "auth-token", token, secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 2,
  });

  return c.html(
    <Layout
      buttonText="Back to Gallery"
      buttonNav="/"
      subtitle="Generate New Adventure"
      footerBottom
    >
      <StartTemplate />
    </Layout>
  );
});

// Generate and store image
app.post("/api/generate", zValidator("form", userInputSchema), async (c) => {
  const secret = c.env.SECRET;
  const token = await getSignedCookie(c, secret, "auth-token");
  if (!token || Object.keys(token).length === 0) {
    return c.json({ error: "Unauthorized" }, { status: 401 });
  }
  deleteCookie(c, "auth-token");
  const { name, activity, artStyle, colorScheme } =
    c.req.valid("form");

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
    const prompt = `A highly detailed image of a goose actively ${activity}. The goose is clearly engaged in the action, with a dynamic posture and realistic interaction with any objects involved. The scene is composed with a strong foreground focus on the goose, ensuring its motion and intent are unmistakable. The background reflects Amsterdam, complementing the main action without overpowering it. Rendered in ${artStyle}. ${artStyplePrompt}. The image captures the characteristic techniques of this style, emphasizing texture, color, and form. The color palette focuses on ${colorScheme}, ensuring visual harmony and a distinct artistic mood. `;

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

    // store in R2 bucket
    const timestamp = new Date().getTime();
    const objectKey = `${name}-${timestamp}.png`;
    await c.env.BUCKET.put(objectKey, img);

    // Insert into database and get the ID
    const result = await c.env.DB.prepare(
      "INSERT INTO gooseUser (username, location, activity, color, artstyle, thumbnail_key) VALUES (?, ?, ?, ?, ?, ?) RETURNING id"
    )
      .bind(name, location, activity, colorScheme, artStyle, objectKey)
      .first();

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
