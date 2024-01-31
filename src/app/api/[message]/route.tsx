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
  const body = await request.json();
  const { trustedData } = body;
  console.log(JSON.stringify(trustedData, null, 2));

  if (!trustedData) {
    return new Response("Missing trustedData", { status: 441 });
  }
  const fcMessage = await validateMessage(trustedData.messageBytes);
  console.log(fcMessage.message.data);
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
        message.gate.contract as `0x${string}`,
        message.gate.network
      );
    })
  );

  const isMember = balances.some((balance) => balance > 0);

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
          <meta property="fc:frame:button:1" content="Reshare" />
          <meta property="fc:frame:button:1:action" content="post_redirect" />
          <meta property="fc:frame:post_url" content="${
            AppConfig.siteUrl
          }/api/${message.id}/reshare" />

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
  }
}
