"use client";
import { Web3Provider } from "../Components/Web3Provider";
import { Navbar } from "./NavBar";

export default function NewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Web3Provider>
      <Navbar />
      <div className="p-8">{children}</div>
    </Web3Provider>
  );
}
