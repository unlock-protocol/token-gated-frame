import { getMessage } from "@/lib/messages";
import { getUserAddresses } from "@/lib/farcaster";
import { meetsRequirement } from "@/lib/unlock";
import { getImage } from "@/lib/utils";

interface Button {
  label: string;
  action: string;
}

export const renderMessageForFid = async (
  origin: string,
  messageId: string,
  fid?: string | null
) => {
  const message = await getMessage(messageId);
  if (!message) {
    return new Response("Message not found", { status: 404 });
  }

  if (!fid) {
    return render(origin, message, "pending", `${origin}/api/${message.id}/`, [
      {
        label: "Reveal 🔓",
        action: "post",
      },
    ]);
  }

  const addresses = await getUserAddresses(fid);
  if (addresses.length === 0) {
    return render(origin, message, "no-wallet");
  }

  const isMember = (
    await Promise.all(
      addresses.map((userAddress: string) => {
        return meetsRequirement(
          userAddress as `0x${string}`,
          message.frame.gate
        );
      })
    )
  ).some((balance) => !!balance);

  if (isMember) {
    // No action (yet!)
    return render(origin, message, "clear");
  } else if (message.frame.checkoutUrl) {
    // Show the checkout button
    return render(
      origin,
      message,
      "hidden",
      `${origin}/api/${message.id}/checkout`,
      [
        {
          label: "Get the tokens!",
          action: "post_redirect",
        },
      ]
    );
  } else {
    // No checkout button!
    return render(origin, message, "hidden");
  }
};

export const render = async (
  base: string,
  message: { id: string; author: string; frame: any },
  status: "pending" | "hidden" | "clear" | "no-wallet",
  postUrl?: string,
  buttons?: Button[]
) => {
  const image = getImage(base, message, status);
  return new Response(
    `<!DOCTYPE html>
    <html>
      <head>
        <meta name="description" content="${message.frame.description}">
        
        <meta property="og:title" content="${message.frame.title}">
        <meta property="og:description" content="${message.frame.description}">
        <meta property="og:url" content="${base}/c/${message.id}">
        <meta property="og:image" content="${base}/api/og/${message.id}">
        <meta property="og:type" content="website">

        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:description" content="${message.frame.description}">
        <meta name="twitter:image" content="${base}/api/og/${message.id}">

        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${image}" />
        ${
          postUrl
            ? `<meta property="fc:frame:post_url" content="${postUrl}" />`
            : ``
        }
        ${(buttons || [])
          .map((button, i) => {
            return `<meta property="fc:frame:button:${i + 1}" content="${
              button.label
            }" />
              <meta property="fc:frame:button:${i + 1}:action" content="${
              button.action
            }" />`;
          })
          .join("\n")}
      </head>

      <body style="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column;">
        <img style="border: 2px solid #000; border-radius: 10px;" src="${image}" />
        <p>
          <a style="display: inline-block; padding: 10px 20px; font-size: 16px; cursor: pointer; text-align: center; text-decoration: none; color: #ffffff; background-color: #007bff; border: none; border-radius: 5px;" href="https://warpcast.com/~/compose?text=Check%20this%20frame!&embeds[]=${base}/c/${
      message.id
    }" target="_blank">Cast-it</a>
        </p>
      </body>
    </html>`,
    {
      headers: {
        "Content-Type": "text/html",
      },
      status: 200,
    }
  );
};
