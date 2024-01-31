import { getMessage } from "@/lib/messages";
import { AppConfig } from "@/app/AppConfig";

export async function POST(
  request: Request,
  { params }: { params: { message: string } }
) {
  return new Response(`${AppConfig.siteUrl}/api/${params.message}/redirect`, {
    status: 302,
  });
}
