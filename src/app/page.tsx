import { validateMessage } from "@/lib/farcaster";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  return (
    <main className="p-8">
      <h1 className="text-xl font-bold">Token Gated Frames</h1>
      <p className="mt-2">
        <Link
          target="_blank"
          className="underline"
          href="https://warpcast.notion.site/Farcaster-Frames-4bd47fe97dc74a42a48d3a234636d8c5"
        >
          Frames
        </Link>{" "}
        are an interation on top of{" "}
        <Link target="_blank" className="underline" href="https://ogp.me/">
          OpenGraph
        </Link>
        .
      </p>
      <p className="mt-2">
        At{" "}
        <Link
          target="_blank"
          className="underline"
          href="https://unlock-protocol.com/"
        >
          Unlock
        </Link>{" "}
        we built a protocol for membership. You can now{" "}
        <em>token-gate your frames</em> so that only active members can see
        their content!
      </p>
      <p className="mt-2">
        <Link
          target="_blank"
          className="underline"
          href="https://warpcast.com/julien51.eth/0xa5390f5a"
        >
          Demo
        </Link>{" "}
        |{" "}
        <Link
          target="_blank"
          className="underline"
          href="https://github.com/unlock-protocol/token-gated-frame"
        >
          Source code
        </Link>
      </p>
    </main>
  );
}
