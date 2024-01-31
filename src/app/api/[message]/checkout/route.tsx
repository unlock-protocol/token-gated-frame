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
  const checkoutRedirect = new URL(request.url);

  try {
    // Get the message URL so we can then redirect to it!
    const posterProfile = await getUserProfile(
      fcMessage.message.data.frameActionBody?.castId?.fid
    );
    const userName = posterProfile.messages
      .sort((a: any, b: any) => a.data.timestamp > b.data.timestamp)
      .find((m: any) => {
        return (
          m.data.type === "MESSAGE_TYPE_USER_DATA_ADD" &&
          m.data.userDataBody.type === "USER_DATA_TYPE_USERNAME"
        );
      }).data.userDataBody.value;
    checkoutRedirect.searchParams.append(
      "cast",
      `https://warpcast.com/${userName}/${fcMessage.message.data.frameActionBody?.castId.hash}`
    );
  } catch (error) {
    console.error(
      `Could not build the redirect URL for ${JSON.stringify(
        fcMessage.message.data,
        null,
        2
      )}`
    );
    console.error(error);
  }
  return Response.redirect(checkoutRedirect.toString(), 302);
}

export async function GET(
  request: Request,
  { params }: { params: { message: string } }
) {
  const message = await getMessage(params.message);
  const checkoutUrl = new URL(message.checkoutUrl);

  const u = new URL(request.url);
  const cast = u.searchParams.get("cast");
  if (cast) {
    // We have a cast URL to redirect to!
    checkoutUrl.searchParams.append("redirect-url", cast!);
  }

  return Response.redirect(checkoutUrl.toString(), 302);
}
