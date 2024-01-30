import { AppConfig } from "@/app/AppConfig";

export const getImage = (message: { id: string }, state = "pending") => {
  const u = new URL(`${AppConfig.siteUrl}/api/og/${message.id}`);
  if (state !== "pending") {
    u.searchParams.append("state", state);
  }
  return u.toString();
};
