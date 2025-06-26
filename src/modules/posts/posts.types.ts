import { z } from "zod";

// Zod schema for a Post: Full object, includes id
export const PostSchema = z.object({
  id: z.number(),
  imageUrl: z.string().url(),
  caption: z.string(),
  authorId: z.number()
});

// create TypeScript type from PostSchema
export type Post = z.infer<typeof PostSchema>;

// create payload schema for post requests / incomin POST: Version without id
export const CreatePostSchema = PostSchema.omit({ id: true});

export type CreatePostPayload = z.infer<typeof CreatePostSchema>; // Convert Zod schema into TypeScript type

