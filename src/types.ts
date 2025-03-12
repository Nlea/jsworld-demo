import { z } from "zod";

export interface User {
  name: string;
  image: string;
  id: string;
}

export const userInputSchema = z.object({
  name: z.string().min(1).max(10),
  activity: z.enum([
    "cycling in Amsterdam",
    "walking in Vondelpark",
    "doing a boat tour",
    "drinking a Heineken",
    "eating a waffle",
    "visiting windmills",
    "visiting Rijksmuseum",
    "visiting tulip fields",
  ]),
  artStyle: z.enum(["whiteboard", "vangogh", "lowpoly"]),
  colorScheme: z.enum([
    "orange, blue and white",
    "red, yellow, pink and green",
    "black and white",
  ]),
});

export interface CardData {
  username: string;
  activity: string;
  color: string;
  thumbnail_key: string;
  artStyle: string;
  imageUrl: string;
}

// Derive the type from the schema
export type UserInput = z.infer<typeof userInputSchema>;
