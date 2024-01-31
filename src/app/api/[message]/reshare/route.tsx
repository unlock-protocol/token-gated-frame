import { getMessage } from "@/lib/messages";
import { AppConfig } from "@/app/AppConfig";

export async function POST(
  request: Request,
  { params }: { params: { message: string } }
) {
  // How can we post in FC?
  return new Response(`${AppConfig.siteUrl}/api/${params.message}/repost`, {
    status: 302,
  });
}
