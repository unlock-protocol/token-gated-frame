import { getMessage } from "@/lib/messages";
import { AppConfig } from "@/app/AppConfig";

export async function POST(
  request: Request,
  { params }: { params: { message: string } }
) {
  const message = await getMessage(params.message);

  return Response.redirect(message.checkoutUrl, 302);
}
