import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { UserProfile, AuthenticatedUserInfo } from "./types";
import { profileTemplate } from "./templates/profile";
// Middleware section
import { basicAuth } from "hono/basic-auth";
//import { createFiberplane } from "@fiberplane/hono"
//import { createOpenAPISpec } from "@fiberplane/hono"

const app = new Hono();

// Auth middleware for /api/* endpoints
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
app.post("/api/generate");

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
