import { Hono } from "hono";
import { GoogleGenAI } from "@google/genai";
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
  GEMINI_API_KEY: string;
  CLOUDFLARE_ACCOUNT_ID: string;
  GATEWAY_NAME: string;
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
  const page = parseInt(c.req.query("page") || "1");
  const perPage = 12;
  const offset = (page - 1) * perPage;

  // Get paginated data and total count
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM gooseUser ORDER BY created_at DESC LIMIT ? OFFSET ?"
  )
    .bind(perPage, offset)
    .all();

  const { total } = (await c.env.DB.prepare(
    "SELECT COUNT(*) as total FROM gooseUser"
  ).first()) as { total: number };

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
  const totalPages = Math.ceil(total / perPage);

  return c.html(
    <Layout
      buttonText="Generate New Adventure"
      buttonNav="start"
      subtitle="Gallery"
    >
      <GalleryTemplate
        data={cardData}
        currentPage={page}
        totalPages={totalPages}
      />
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
  console.log();
  const { name, activity, artStyle, colorScheme } = c.req.valid("form");
  const ai = new GoogleGenAI({
    apiKey: c.env.GEMINI_API_KEY,
    httpOptions: {
      baseUrl: `https://gateway.ai.cloudflare.com/v1/${c.env.CLOUDFLARE_ACCOUNT_ID}/${c.env.GATEWAY_NAME}/google-ai-studio`,
    },
  });

  // create a prompt based on the user input
  let artStyplePrompt = "";
  if (artStyle === "retro photo booth") {
    artStyplePrompt =
      "Vintage photobooth style, nostalgic essence of 1980s Berlin, with grainy film texture, slightly faded colors, and soft focus, showing four black and white or sepia-toned photo strips, scratched edges, authentic analog film look with visible grain and imperfections.";
  } else if (artStyle === "streetart") {
    artStyplePrompt =
      "Vibrant urban street art mural with dynamic spray-painted elements, bold typographic designs, and layered mixed-media textures, featuring a complex composition that blends abstract and figurative styles, with sharp urban energy, dripping paint effects, and a gritty metropolitan background of weathered concrete or brick wall, utilizing a bold color palette and stark black outlines, incorporating street culture symbolism and rebellious graphic elements";
  } else if (artStyle === "bauhaus") {
    artStyplePrompt =
      "Minimalist geometric composition with primary colors red, blue, and yellow, featuring clean angular shapes, sans-serif typography, and a balanced asymmetrical design that embodies the Bauhaus principles of form following function, with sharp lines and simplified architectural elements.";
  }

  try {
    // Use AI to generate image
    const prompt = `A image of a goose actively ${activity}. The scene is composed with a foreground focus. The background reflects Berlin, complementing the main action without overpowering it. Full picture is in cartoon style rendered in ${artStyle}. ${artStyplePrompt}. The color palette focuses on ${colorScheme}.`;

    const response = await ai.models.generateContentStream({
      model: "gemini-2.5-flash-image-preview",
      contents: prompt,
      config: {
        responseModalities: ["image"],
      },
    });

    let objectKey = "";
    let buffer;

    for await (const chunk of response) {
      if (
        !chunk.candidates ||
        !chunk.candidates[0].content ||
        !chunk.candidates[0].content.parts
      ) {
        continue;
      }
      if (chunk.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
        const timestamp = new Date().getTime();
        objectKey = `${name}-${timestamp}.png`;
        const inlineData = chunk.candidates[0].content.parts[0].inlineData;
        buffer = Buffer.from(inlineData.data || "", "base64");
        await c.env.BUCKET.put(objectKey, buffer);
        console.log(`Image saved as ${objectKey}`);
      } else {
        console.log(chunk.text);
      }
    }

    // Insert into database and get the ID
    await c.env.DB.prepare(
      "INSERT INTO gooseUser (username, activity, color, artstyle, thumbnail_key) VALUES (?, ?, ?, ?, ?) RETURNING id"
    )
      .bind(name, activity, colorScheme, artStyle, objectKey)
      .first();

    return new Response(buffer, {
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
