import { getMessage } from "@/lib/messages";
import { getUserAddresses, verifyMessage } from "@/lib/farcaster";
import { balanceOf } from "@/lib/unlock";
import { getImage } from "@/lib/utils";

export const runtime = "edge";

export async function POST(
  request: Request,
  { params }: { params: { message: string } }
) {
  const message = await getMessage(params.message);
  const body = await request.json();
  const { trustedData } = body;

  const isMember = true;

  if (!trustedData) {
    console.error("Missing trustedData");
    return new Response("Missing trustedData", { status: 441 });
  }
  const fcMessage = await verifyMessage(trustedData.messageBytes);
  if (!fcMessage.valid) {
    console.error("Invalid message");
    return new Response("Invalid message", { status: 442 });
  }

  const addresses = await getUserAddresses(fcMessage.message.data.fid);
  if (addresses.length === 0) {
    console.error("Missing wallet");
    return new Response("Missing wallet addresses in your Farcaster profile!", {
      status: 200,
    });
  }

  // const balances = await Promise.all(
  //   addresses.map((userAddress: string) => {
  //     return balanceOf(
  //       userAddress as `0x${string}`,
  //       message.gate.contract as `0x${string}`,
  //       message.gate.network
  //     );
  //   })
  // );

  // const isMember = balances.some((balance) => balance > 0);

  if (isMember) {
    // We would need to generate a unique URL that renders the image in clear
    // and send that back to the user
    // TODO: Make that safe... actually!
    return new Response(
      `<!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${getImage(
            message,
            "clear"
          )}" />
        </head>
      </html>`
    );
  } else {
    return new Response(
      `<!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${getImage(
            message,
            "hidden"
          )}" />
        </head>
      </html>`,
      {
        status: 200,
      }
    );
  }
}
