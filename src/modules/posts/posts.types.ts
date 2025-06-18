import { z } from "zod";

// Zod schema for a Post
export const PostSchema = z.object({
  id: z.number(),
  imageUrl: z.string().url(),
  caption: z.string(),
  authorId: z.number()
});

// TypeScript type inferred from schema
export type Post = z.infer<typeof PostSchema>;
