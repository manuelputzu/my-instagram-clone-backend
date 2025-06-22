import Fastify from "fastify";
import { postsRoutes } from "./posts.routes";

describe("Posts Routes", () => {
  // --- Test #1: Create a Post ---
  it("should create a new post and return it with a 201 status code", async () => {
    const app = Fastify();

    const newPostPayload = {
      img_url: "http://example.com/new-image.jpg",
      caption: "A brand new post from our test!",
    };

    const createdPost = {
      id: 1,
      ...newPostPayload,
      created_at: new Date().toISOString(),
    };

    // --- FIX IS HERE ---
    // The mock object MUST perfectly match the FastifyInstance type.
    // This means we MUST include a `reels` property, even if it's just empty mocks.
    app.decorate("transactions", {
      posts: {
        getById: jest.fn(),
        getAll: jest.fn(),
        create: jest.fn().mockReturnValue(createdPost),
      },
      reels: {
        getById: jest.fn(),
        getAll: jest.fn(),
        create: jest.fn(),
      },
    });

    app.register(postsRoutes);

    const response = await app.inject({
      method: "POST",
      url: "/posts",
      payload: newPostPayload,
    });

    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.payload)).toEqual(createdPost);
  });

  // --- Test #2: Get All Posts ---
  it("should get all posts and return them with a 200 status code", async () => {
    const app = Fastify();

    const fakePosts = [
      { id: 1, img_url: "http://example.com/image.jpg", caption: "First post!", created_at: new Date().toISOString() },
      { id: 2, img_url: "http://example.com/image2.jpg", caption: "Second post!", created_at: new Date().toISOString() },
    ];

    // --- FIX IS HERE ---
    // This mock also needs the complete `transactions` shape.
    app.decorate("transactions", {
      posts: {
        getById: jest.fn(),
        getAll: jest.fn().mockReturnValue(fakePosts),
        create: jest.fn(),
      },
      reels: {
        getById: jest.fn(),
        getAll: jest.fn(),
        create: jest.fn(),
      },
    });

    app.register(postsRoutes);

    const response = await app.inject({
      method: "GET",
      url: "/posts",
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toEqual(fakePosts);
  });
}); 