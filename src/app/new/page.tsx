"use client";
import { useAccount } from "wagmi";
import { Form } from "./Form";

const NotConnected = () => {
  return (
    <div className="prose p-2">
      <p>Please start by connecting a wallet.</p>
    </div>
  );
};

export default function NewFrame() {
  const { address } = useAccount();

  return (
    <>
      {!address && <NotConnected />}
      {address && <Form />}
    </>
  );
}
