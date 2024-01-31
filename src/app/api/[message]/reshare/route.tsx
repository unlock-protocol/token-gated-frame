import { getMessage } from "@/lib/messages";

export async function POST(
  request: Request,
  { params }: { params: { message: string } }
) {
  return Response.redirect(request.url, 302);
}

export async function GET(
  request: Request,
  { params }: { params: { message: string } }
) {
  const message = await getMessage(params.message);

  return Response.redirect(message.checkoutUrl, 302);
}
