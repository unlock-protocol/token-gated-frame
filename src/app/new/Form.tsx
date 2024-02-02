"use client";
import { Frame } from "@/types";
import networks from "@unlock-protocol/networks";
import { createFrame } from "./actions";
import { useFormState } from "react-dom";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export const Form = () => {
  const { push } = useRouter();
  const { address } = useAccount();

  // @ts-expect-error
  const [frame, formAction] = useFormState<Partial<Frame>>(createFrame, {
    author: address,
    frame: {},
  });
  // const status = useFormStatus();

  useEffect(() => {
    if (frame?.id) {
      return push(`/c/${frame.id}`);
    }
  }, [frame, push]);

  return (
    <div className="p-2 prose">
      <p>
        Please complete the following form! You can use any ERC721 contract,
        including Unlock Protocol&apos;s{" "}
        <Link target="_blank" href="https://unlock-protocol.com/">
          Membership contracts
        </Link>
        !
      </p>
      <form action={formAction} className="form-control	flex gap-4">
        <input type="hidden" name="author" value={address} />

        <div className="flex flex-col">
          <label htmlFor="title">Title</label>
          <input className="input" name="frame.title" required />
        </div>

        <div className="flex flex-col">
          <label htmlFor="body">Hidden part</label>
          <textarea
            className="textarea textarea-borderedput"
            placeholder="That's the hidden part!"
            name="frame.body"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="body">Public part</label>
          <textarea
            className="textarea textarea-borderedput"
            placeholder="That's the part to entice users to reveal the hidden part."
            name="frame.description"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="body">Checkout URL (optional)</label>
          <input
            className="input"
            placeholder="A URL where users can go to purchase an NFT membership."
            name="frame.checkoutUrl"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="body">Network</label>
          <select
            className="select select-bordered w-full max-w-xs"
            name="frame.gate.network"
            required
          >
            {Object.keys(networks)
              .filter((i) => {
                return i !== "31337";
              })
              .map((network) => {
                return (
                  <option key={network} value={network}>
                    {networks[network].name}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="body">Contract address</label>
          <input
            className="input"
            placeholder="A URL where users can go to purchase an NFT membership."
            name="frame.gate.contract"
            required
          />
        </div>

        <button className="btn btn-neutral" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
