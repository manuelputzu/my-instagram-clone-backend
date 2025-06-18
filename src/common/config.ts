// src/common/config.ts

import { z } from 'zod'; // Import Zod for schema validation

// Define the schema for your application configuration using Zod.
// This helps ensure that your configuration has the expected structure and types.
const configSchema = z.object({
  port: z.number().int().min(1024).max(65535).default(3000), // Server port, default to 3000
  host: z.string().ip({ version: 'v4' }).default('0.0.0.0'), // Server host, default to 0.0.0.0
  databasePath: z.string().default('./data/instagram.sqlite'), // Path to your SQLite database file
  // Add other configurations as your application grows, e.g., JWT secret, upload paths
});

// Load configuration from environment variables or provide defaults.
// In a real application, you might use a library like `dotenv` or `conf`
// to load these from a .env file. For simplicity, we'll use process.env
// with sensible defaults if environment variables are not set.
const rawConfig = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : undefined,
  host: process.env.HOST || undefined,
  databasePath: process.env.DATABASE_PATH || undefined,
};

// Validate the raw configuration against the schema.
// This will throw an error if the configuration is invalid,
// ensuring your application starts with valid settings.
export const appConfig = configSchema.parse(rawConfig);

console.log('Application Configuration Loaded:', appConfig);

