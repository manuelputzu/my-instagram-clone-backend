// We are extending the 'fastify' module with our custom types.
declare module "fastify" {
  // Define a reusable type for the data needed to create a post.
  type CreatePostData = {
    img_url: string;
    caption: string;
  };

  // Define the shape of a Post object that comes from the database.
  type Post = {
    id: number;
    img_url: string;
    caption: string;
    created_at: string;
  };

  // Define the methods available for interacting with posts in the database.
  // This is the "contract" our service layer will use.
  export interface PostsTransactions {
    create: (postData: CreatePostData) => Post | Promise<Post>;
    getAll: () => Post[] | Promise<Post[]>;
    getById: (id: number) => Post | null | Promise<Post | null>;
  }

  // Now, we merge our `transactions` property into the main FastifyInstance.
  // This tells TypeScript that every `fastify` instance will have this property.
  export interface FastifyInstance {
    transactions: {
      posts: PostsTransactions;
    };
  }
}
