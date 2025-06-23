// data validation and typing
import { z } from "zod";

// Zod schema for a Reel
export const ReelSchema = z.object({
  id: z.number(),
  mov_url: z.string().url(),
  caption: z.string(),
  authorId: z.number()
});

// TypeScript type inferred from schema
export type Reel = z.infer<typeof ReelSchema>;
