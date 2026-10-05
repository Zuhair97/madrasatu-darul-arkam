/**
 * Centralized environment configuration.
 *
 * No secrets are stored in source control.
 * Database and authentication variables will be added
 * when the production backend phase begins.
 */

export const ENV = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",
} as const;
