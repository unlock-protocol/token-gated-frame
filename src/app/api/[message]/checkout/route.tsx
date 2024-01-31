import { getMessage } from "@/lib/messages";
import { AppConfig } from "@/app/AppConfig";

export async function GET(
  request: Request,
  { params }: { params: { message: string } }
) {
  const message = await getMessage(params.message);

  return new Response(message.checkoutUrl, {
    status: 302,
  });
}
