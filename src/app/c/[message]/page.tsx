import { AppConfig } from "@/app/AppConfig";
import { Message } from "@/app/Components/Message";
import { getMessage } from "@/lib/messages";
import { getImage } from "@/lib/utils";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { message: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const message = await getMessage(params.message);
  const image = getImage(message, "pending");
  const url = `${AppConfig.siteUrl}/c/${message.id}`;
  const buttonHandler = `${AppConfig.siteUrl}/api/${message.id}/`;

  return {
    metadataBase: new URL(AppConfig.siteUrl),
    title: message.title,
    description: message.description,
    openGraph: {
      type: "website",
      url,
      images: [image],
    },
    other: {
      "fc:frame": "vNext",
      "fc:frame:image": image,
      "fc:frame:post_url": buttonHandler,
      "fc:frame:button:1": "Reveal 🔓",
    },
  };
}

export default async function MessagePage({ params }: Props) {
  const message = await getMessage(params.message);

  return (
    <div className="w-full bg-black h-screen flex items-center justify-center">
      {/* By default we only render the message's description! */}
      <Message content={message.description} />
    </div>
  );
}
