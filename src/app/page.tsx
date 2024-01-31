import { validateMessage } from "@/lib/farcaster";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  return (
    <main className="p-8">
      <p>Ready?</p>
    </main>
  );
}
