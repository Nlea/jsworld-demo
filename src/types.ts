import { z } from 'zod';

export interface User {
  name: string;
  image: string;
  id: string;
}

export const userInputSchema = z.object({
    name: z.string().min(1).max(10),
    location: z.enum(['windmills', 'keukenhof', 'rijksmuseum', 'vondelpark', 'tulip-fields']),
    activity: z.enum(['cycling', 'boat-tour', 'drinking-heineken', 'eating-stroopwafel']),
    artStyle: z.enum(['whiteboard', 'vangogh', 'lowpoly']),
    colorScheme: z.enum(['dutch-classic', 'tulip-fields', 'black-and-white'])
});


export interface CardData {
  username: string;
  location: string;
  activity: string;
  color: string;
  thumbnail_key: string;
  base64: string;
}

// Derive the type from the schema
export type UserInput = z.infer<typeof userInputSchema>;
