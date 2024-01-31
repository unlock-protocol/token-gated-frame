import { Message } from "@/app/Components/Message";
import { getMessage } from "@/lib/messages";
import { ImageResponse } from "@vercel/og";

export async function GET(
  request: Request,
  { params }: { params: { message: string } }
) {
  const u = new URL(request.url);
  const message = await getMessage(params.message);

  let content = message.description;
  if (u.searchParams.get("state") === "clear") {
    content = message.body;
  } else if (u.searchParams.get("state") === "hidden") {
    content = "Sorry, you need to get a membership!";
  }

  return new ImageResponse(<Message content={content} />, {
    width: 1200,
    height: 630,
  });
}
