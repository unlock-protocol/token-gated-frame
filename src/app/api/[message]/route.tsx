import { getMessage } from "@/lib/messages";
import { getUserAddresses, validateMessage } from "@/lib/farcaster";
import { balanceOf } from "@/lib/unlock";
import { getImage } from "@/lib/utils";
import { AppConfig } from "@/app/AppConfig";

export async function POST(
  request: Request,
  { params }: { params: { message: string } }
) {
  const message = await getMessage(params.message);
  if (!message) {
    return new Response("Message not found", { status: 404 });
  }
  const body = await request.json();
  const { trustedData } = body;

  if (!trustedData) {
    return new Response("Missing trustedData", { status: 441 });
  }
  const fcMessage = await validateMessage(trustedData.messageBytes);
  if (!fcMessage.valid) {
    return new Response("Invalid message", { status: 442 });
  }

  const addresses = await getUserAddresses(fcMessage.message.data.fid);
  if (addresses.length === 0) {
    return new Response(
      `<!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${new URL(
            `${AppConfig.siteUrl}/api/og/no-wallet`
          ).toString()}" />
        </head>
      </html>`
    );
  }

  const balances = await Promise.all(
    addresses.map((userAddress: string) => {
      return balanceOf(
        userAddress as `0x${string}`,
        message.frame.gate.contract as `0x${string}`,
        message.frame.gate.network
      );
    })
  );

  const isMember = balances.some((balance) => balance > 0);

  if (isMember) {
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
  } else if (message.frame.checkoutUrl) {
    return new Response(
      `<!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${getImage(
            message,
            "hidden"
          )}" />
          <meta property="fc:frame:button:1" content="Get Membership NFT!" />
          <meta property="fc:frame:button:1:action" content="post_redirect" />
          <meta property="fc:frame:post_url" content="${
            AppConfig.siteUrl
          }/api/${message.id}/checkout" />
        </head>
      </html>`,
      {
        status: 200,
      }
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
