import { getUserProfile, validateMessage } from "@/lib/farcaster";
import { getMessage } from "@/lib/messages";

export async function POST(
  request: Request,
  { params }: { params: { message: string } }
) {
  const body = await request.json();
  const { trustedData } = body;

  if (!trustedData) {
    return new Response("Missing trustedData", { status: 441 });
  }
  const fcMessage = await validateMessage(trustedData.messageBytes);
  if (!fcMessage.valid) {
    return new Response("Invalid message", { status: 442 });
  }

  // Get the message URL so we can then redirect to it!
  const posterProfile = await getUserProfile(
    fcMessage.message.data.frameActionBody?.castId?.fid
  );
  console.log(posterProfile);
  const checkoutRedirect = new URL(request.url);
  checkoutRedirect.searchParams.append("cast", "redirect");

  return Response.redirect(checkoutRedirect.toString(), 302);
}

export async function GET(
  request: Request,
  { params }: { params: { message: string } }
) {
  const message = await getMessage(params.message);

  return Response.redirect(message.checkoutUrl, 302);
}
