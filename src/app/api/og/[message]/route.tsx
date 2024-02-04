import { Message } from "@/app/Components/Message";
import { getMessage } from "@/lib/messages";
import { ImageResponse } from "@vercel/og";

export async function GET(
  request: Request,
  { params }: { params: { message: string } }
) {
  const u = new URL(request.url);
  let content = "";
  if (u.searchParams.get("state") === "no-wallet") {
    content = "Please link your farcaster account to a wallet!";
  } else {
    const message = await getMessage(params.message);
    if (!message) {
      return new Response("Message not found", { status: 404 });
    }
    content = message.frame.description;
    if (u.searchParams.get("state") === "clear") {
      content = message.frame.body;
    } else if (u.searchParams.get("state") === "hidden") {
      content =
        message.frame.denied || "You need to get a membership! Click below ⬇️";
    }
  }
  return new ImageResponse(<Message content={content} />, {
    width: 1200,
    height: 630,
  });
}
