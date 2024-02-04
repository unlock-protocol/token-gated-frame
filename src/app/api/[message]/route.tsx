import { validateMessage } from "@/lib/farcaster";
import { renderMessageForFid } from "./render";

export async function POST(
  request: Request,
  { params }: { params: { message: string } }
) {
  const u = new URL(request.url);
  const body = await request.json();
  const { trustedData } = body;

  if (!trustedData) {
    return new Response("Missing trustedData", { status: 441 });
  }
  const fcMessage = await validateMessage(trustedData.messageBytes);
  if (!fcMessage.valid || !fcMessage.message.data.fid) {
    return new Response("Invalid message", { status: 442 });
  }
  return renderMessageForFid(
    u.origin,
    params.message,
    fcMessage.message.data.fid
  );
}

// REMOVE ME FOR PROD!
export async function GET(
  request: Request,
  { params }: { params: { message: string } }
) {
  const u = new URL(request.url);
  const fid = u.searchParams.get("fid");
  return renderMessageForFid(u.origin, params.message, fid);
}
