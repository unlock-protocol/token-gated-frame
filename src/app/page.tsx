"use client";
import { validateMessage } from "@/lib/farcaster";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const debug = async () => {
    validateMessage(
      "0a42080d10c4aa0118c6d1922e20018201320a12687474703a2f2f6578616d706c652e636f6d10011a1a08c4aa0112141fd48ddc9d5910046acfa5e1b91d253763e320c31214230a1291ae8e220bf9173d9090716981402bdd3d18012240f08c907486afe1c3311565b7a27c1f0011c74bd22ba167abe8ba30a35e808cbeae674aef7b74d3161c6186e48e3cc4d843c5ec9dc1dce9c6b71547adcc02c90c28013220196a70ac9847d59e039d0cfcf0cde1adac12f5fb447bb53334d67ab18246306c"
    );
  };

  return (
    <main className="p-8">
      <p>Token Gated Frames!</p>
      <button className="bg-slate-300 rounded" onClick={debug}>
        Say hi 👋!!!
      </button>{" "}
    </main>
  );
}
