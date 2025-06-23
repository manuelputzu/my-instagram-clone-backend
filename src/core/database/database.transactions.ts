import type { Database } from "better-sqlite3";

// This factory function creates and returns our transaction helpers.
export const createTransactionHelpers = (db: Database) => {
  // We use prepared statements for security and performance.
  const statements = {
    getPostById: db.prepare("SELECT * FROM posts WHERE id = ?"),
    getAllPosts: db.prepare("SELECT * FROM posts"),
    createPost: db.prepare(
      "INSERT INTO posts (img_url, caption) VALUES (@img_url, @caption) RETURNING *",
    ),
    getReelById: db.prepare("SELECT * FROM reels WHERE id = ?"),
    getAllReels: db.prepare("SELECT * FROM reels"),
    createReel: db.prepare(
      "INSERT INTO reels (mov_url, caption) VALUES (@mov_url, @caption) RETURNING *",
    ),
  };

  const posts = {
    getById: (id: number) => {
      return statements.getPostById.get(id);
    },
    getAll: () => {
      return statements.getAllPosts.all();
    },
    create: (data: { img_url: string; caption: string }) => {
      return statements.createPost.get(data);
    },
  };

  const reels = {
    getById: (id: number) => {
      return statements.getReelById.get(id);
    },
    getAll: () => {
      return statements.getAllReels.all();
    },
    create: (data: { mov_url: string; caption: string }) => {
      return statements.createReel.get(data);
    },
  };

  return {
    posts,
    reels,
  };
};

export type TransactionHelpers = ReturnType<typeof createTransactionHelpers>;