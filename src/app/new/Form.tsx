"use client";
import { Frame } from "@/types";
import networks from "@unlock-protocol/networks";
import { createFrame } from "./actions";
import { useFormState, useFormStatus } from "react-dom";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export const Form = () => {
  const [showTokenId, setShowTokenId] = useState(false);
  const { push } = useRouter();
  const { address } = useAccount();

  // @ts-expect-error
  const [frame, formAction] = useFormState<Partial<Frame>>(createFrame, {
    author: address,
    frame: {},
  });
  const status = useFormStatus();

  useEffect(() => {
    if (frame?.id) {
      return push(`/c/${frame.id}`);
    }
  }, [frame, push]);

  return (
    <div className="p-2 prose">
      <p>
        Please complete the following form! You can use any ERC721, ERC20 or
        ERC1155 contract, including Unlock Protocol&apos;s{" "}
        <Link target="_blank" href="https://unlock-protocol.com/">
          Membership contracts
        </Link>{" "}
        (they are ERC721 contracts on steroids).
      </p>
      <form action={formAction} className="form-control	flex">
        <input type="hidden" name="author" value={address} />

        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="body">Public part</label>
            <textarea
              className="textarea textarea-bordered "
              placeholder="Want to see more? Click the reveal button below ⬇️"
              name="frame.description"
              required
            />
            <small className="text-slate-500">
              This part is shown to user before they click &quot;reveal&quot;!
            </small>
          </div>

          <div className="flex flex-col">
            <label htmlFor="body">Hidden part</label>
            <textarea
              className="textarea textarea-bordered "
              placeholder="Now you know the secret! 🤫🔓🎉"
              name="frame.body"
              required
            />
            <small className="text-slate-500">
              This will only be shown to users who meet the criteria of the
              token-gate
            </small>
          </div>

          <div className="flex flex-col">
            <label htmlFor="body">Denied Part</label>
            <textarea
              className="textarea textarea-bordered "
              placeholder="Sorry, you don't meet the requirements to see this content. 😢🔒🚫"
              name="frame.denied"
              required
            />
            <small className="text-slate-500">
              That&apos;s the part shown to users who do not meet the
              gate&apos;s requirement.
            </small>
          </div>
        </div>
        <h3>Token Gate</h3>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col grow">
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
            <div className="flex flex-col grow">
              <label htmlFor="body">Contract Type:</label>
              <select
                className="select select-bordered w-full max-w-xs"
                name="frame.gate.type"
                required
                onChange={(evt) => {
                  setShowTokenId(evt.target.value === "ERC1155");
                }}
              >
                {["ERC721", "ERC20", "ERC1155"].map((contractType) => {
                  return (
                    <option key={contractType} value={contractType}>
                      {contractType}
                    </option>
                  );
                })}
              </select>
            </div>
            {showTokenId && (
              <div className="flex flex-col">
                <label htmlFor="body">Token id:</label>
                <input
                  className="input w-24"
                  placeholder="1337"
                  name="frame.gate.token"
                  required
                />
              </div>
            )}
            <div className="flex flex-col">
              <label htmlFor="body">Balance:</label>
              <input
                className="input w-24"
                defaultValue="1"
                name="frame.gate.balance"
                required
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="body">Contract address</label>
            <input
              pattern="^0x[a-fA-F0-9]{40}$"
              className="input "
              placeholder="0x..."
              name="frame.gate.contract"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="body">Checkout URL (optional)</label>
            <input
              className="input "
              placeholder="A URL where users can go to purchase the token(s)."
              name="frame.checkoutUrl"
            />
          </div>
          <button
            disabled={status.pending}
            className="btn btn-neutral"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
