import db from "../../core/database/client";
import { Post } from "./posts.types";

export async function getAllPosts(): Promise<Post[]> {
  const stmt = db.prepare("SELECT * FROM posts");
  const posts = stmt.all() as Post[];
  return posts;
}
