import { AppConfig } from "@/app/AppConfig";
import { Message } from "@/app/Components/Message";
import { getMessage } from "@/lib/messages";
import { getImage } from "@/lib/utils";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";

type Props = {
  params: { message: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const message = await getMessage(params.message);
  if (!message) {
    return {
      title: "Message not found",
      description: "Message not found",
      openGraph: {
        type: "website",
        url: `${AppConfig.siteUrl}/c/${params.message}`,
      },
    };
  }
  const image = getImage(message, "pending");
  const url = `${AppConfig.siteUrl}/c/${message.id}`;
  const buttonHandler = `${AppConfig.siteUrl}/api/${message.id}/`;

  return {
    metadataBase: new URL(AppConfig.siteUrl),
    title: message.frame.title,
    description: message.frame.description,
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

  if (!message) {
    return (
      <div className="w-full bg-black h-screen flex items-center justify-center">
        <Message content="Message not found" />
      </div>
    );
  }

  const url = `${AppConfig.siteUrl}/c/${message.id}`;

  return (
    <div className=" bg-black w-full h-screen flex flex-col gap-6 items-center justify-center">
      <div className="aspect-og">
        <Message content={message.frame.description} />
      </div>
      <Link
        href={`https://warpcast.com/~/compose?text=${message.frame.title}!&embeds[]=${url}`}
        target="_blank"
        className="btn"
      >
        Cast-it
      </Link>
    </div>
  );
}
