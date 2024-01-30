import { validateMessage } from "@/lib/farcaster";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const x = await validateMessage(
    "0a59080d10913518b0b9ac2e200182014a0a2b68747470733a2f2f746f6b656e2d67617465642d6672616d652e76657263656c2e6170702f632f3133333710011a190891351214b099c72795bc4480ba504f30fc991e96410aba9412145df32dd4586452d196fad0dcb683a54e4d1d156d180122407d47422f7f24107661f8b5409d9e8a10088e1cdda9fa0ef339dc059395b054bb8a15676518971f7ebefe538eecc008b418aff6cdfac8e5141100ceb49e64330728013220aa31207c6e971528bc984ff8b1bd991d3411cfb4422e0693b0a223bd2b5cc2ac"
  );

  return (
    <main className="p-8">
      <pre> {JSON.stringify(x, null, 2)}</pre>
    </main>
  );
}
