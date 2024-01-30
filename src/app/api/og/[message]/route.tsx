import { Message } from "@/app/Components/Message";
import { getMessage } from "@/lib/messages";
import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(
  request: Request,
  { params }: { params: { message: string } }
) {
  const message = await getMessage(params.message);

  return new ImageResponse(<Message content={message.description} />, {
    width: 1200,
    height: 630,
  });
}
