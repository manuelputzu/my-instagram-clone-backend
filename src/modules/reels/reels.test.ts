// reels.test.ts
import Fastify from "fastify";
import reelsRoutes from "./reels.routes";

describe("Reels Routes", () => {
  // --- Test #1: Get All Reels ---
  it("should get all reels and return them with a 200 status code", async () => {
    const app = Fastify();

    const mockReels = [
      {
        id: 1,
        video_url: "http://example.com/video1.mp4",
        caption: "Reel 1",
        user_id: 1,
      },
      {
        id: 2,
        video_url: "http://example.com/video2.mp4",
        caption: "Reel 2",
        user_id: 2,
      },
    ];

    app.decorate("transactions", {
      posts: {
        getById: jest.fn(),
        getAll: jest.fn(),
        create: jest.fn(),
      },
      reels: {
        getById: jest.fn(),
        getAll: jest.fn().mockReturnValue(mockReels),
        create: jest.fn(),
      },
    });

    app.register(reelsRoutes);

    const response = await app.inject({
      method: "GET",
      url: "/reels/grid",
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toEqual(mockReels);
  });

  // --- Test #2: Create a Reel ---
  it("should create a new reel and return it with a 201 status code", async () => {
    const app = Fastify();

    const newReelPayload = {
      video_url: "http://example.com/new-video.mp4",
      caption: "A brand new reel from our test!",
    };

    const createdReel = {
      id: 1,
      ...newReelPayload,
      user_id: 123, // Example user_id
      created_at: new Date().toISOString(),
    };

    app.decorate("transactions", {
      posts: {
        getById: jest.fn(),
        getAll: jest.fn(),
        create: jest.fn(),
      },
      reels: {
        getById: jest.fn(),
        getAll: jest.fn(),
        create: jest.fn().mockReturnValue(createdReel),
      },
    });

    app.register(reelsRoutes);

    const response = await app.inject({
      method: "POST",
      url: "/reels",
      payload: newReelPayload,
    });

    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.payload)).toEqual(createdReel);
    // Ensure the create mock was called correctly
    expect(
      (app.transactions.reels.create as jest.Mock).mock.calls[0][0]
    ).toEqual(newReelPayload);
  });
});