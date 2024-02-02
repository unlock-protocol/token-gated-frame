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
      {children}
    </Web3Provider>
  );
}
