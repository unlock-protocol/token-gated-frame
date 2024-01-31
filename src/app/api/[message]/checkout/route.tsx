import { getMessage } from "@/lib/messages";
import { AppConfig } from "@/app/AppConfig";

export async function post(
  request: Request,
  { params }: { params: { message: string } }
) {
  return Response.redirect(request.url, 302);
}

export async function get(
  request: Request,
  { params }: { params: { message: string } }
) {
  const message = await getMessage(params.message);

  return Response.redirect(message.checkoutUrl, 302);
}
