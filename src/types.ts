import { z } from "zod";

export interface User {
  name: string;
  image: string;
  id: string;
}

export const userInputSchema = z.object({
  name: z.string().min(1).max(10),
  activity: z.enum([
    "go clubbing",
    "walking in Tiergarten",
    "watching a movie in an outdoor theater",
    "going to a fleamarket",
    "eating a curry wurst",
    "visiting brandenburg gate",
    "eating a kebab",
    "visiting berlin wall"
  ]),
  artStyle: z.enum(["streetart", "bauhaus", "retro photo booth"]),
  colorScheme: z.enum([
    "deep night blue, neon purple, electric green, metallic silver",
    "grass green, soft sky blue, dandelion yellow",
    "black and white"
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
