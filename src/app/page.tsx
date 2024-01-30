import { validateMessage } from "@/lib/farcaster";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const x = await validateMessage(
    "0a59080d1091351888bfac2e200182014a0a2b68747470733a2f2f746f6b656e2d67617465642d6672616d652e76657263656c2e6170702f632f3133333710011a190891351214b099c72795bc4480ba504f30fc991e96410aba9412143b78e42c1d7681acf3fd3e93a6a744e4825f247618012240d1ec66465c302d926695f5873eaac6cd5d10b5e896819d254d611847096cb46e9a93e613a281703c875d4b93ba48885852360f5496166999c7d345dec4f83c0728013220aa31207c6e971528bc984ff8b1bd991d3411cfb4422e0693b0a223bd2b5cc2ac"
  );

  return (
    <main className="p-8">
      <pre> {JSON.stringify(x, null, 2)}</pre>
    </main>
  );
}
