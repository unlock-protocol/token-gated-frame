export const AppConfig = {
  name: "Token Gated Frames",
  description: `A simple Farcaster Frame application that lets you create a token-gated cast. `,
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV,
  siteUrl: process.env.NEXT_PUBLIC_URL_BASE || "http://localhost:3000",
  googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!,
  hotjarId: Number(process.env.NEXT_PUBLIC_HOTJAR_ID!),
} as const;
