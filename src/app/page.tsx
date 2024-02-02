import Link from "next/link";

export default async function Home() {
  return (
    <div className="prose p-2">
      <h1>Token Gated Frames</h1>
      <p>
        <Link
          target="_blank"
          className="link"
          href="https://warpcast.notion.site/Farcaster-Frames-4bd47fe97dc74a42a48d3a234636d8c5"
        >
          Frames
        </Link>{" "}
        are an interation on top of{" "}
        <Link target="_blank" className="link" href="https://ogp.me/">
          OpenGraph
        </Link>
        .
      </p>
      <p>
        At{" "}
        <Link
          target="_blank"
          className="link"
          href="https://unlock-protocol.com/"
        >
          Unlock
        </Link>{" "}
        we built a protocol for membership. You can now{" "}
        <em>token-gate your frames</em> so that only active members can see
        their content!
      </p>
      <Link href={"/new"} className="btn btn-neutral">
        Get Started
      </Link>
    </div>
  );
}
