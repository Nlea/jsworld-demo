import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { UserProfile, AuthenticatedUserInfo } from './types'
import { profileTemplate } from './templates/profile'
// Middleware section
import { basicAuth } from 'hono/basic-auth'
//import { createFiberplane } from "@fiberplane/hono"
//import { createOpenAPISpec } from "@fiberplane/hono"

const app = new Hono()

// Auth middleware for /api/* endpoints
app.use(
  '/api/*',
  basicAuth({
    username: 'hono',
    password: 'acoolproject',
  })
)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/profile', (c) => {
  const userProfile: UserProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    image: 'https://i.pravatar.cc/300',
    hobbies: ['reading', 'hiking', 'photography']
  }
  
  return c.html(profileTemplate(userProfile))
})

app.get('/api/me', (c) => {
  const authenticatedUser: AuthenticatedUserInfo = {
    id: 'usr_123456789',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '+1234567890',
    dateOfBirth: '1990-01-01',
    address: {
      street: '123 Main Street',
      city: 'San Francisco',
      country: 'USA',
      postalCode: '94105'
    },
    accountDetails: {
      createdAt: '2024-01-01T00:00:00Z',
      lastLogin: '2025-03-04T09:46:39Z',
      subscriptionTier: 'premium',
      isEmailVerified: true,
      twoFactorEnabled: true
    },
    preferences: {
      language: 'en',
      timezone: 'America/Los_Angeles',
      notifications: true,
      newsletter: false
    },
    billing: {
      plan: 'premium',
      nextBillingDate: '2025-04-01T00:00:00Z',
      paymentMethod: 'card_****4242'
    }
  }
  
  return c.json(authenticatedUser)
})

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
// serve({
//   fetch: app.fetch,
//   port: 8787
// }, (info) => {
//   console.log(`Listening on http://localhost:${info.port}`)
// })


//Cloudflare Workers
export default app;

