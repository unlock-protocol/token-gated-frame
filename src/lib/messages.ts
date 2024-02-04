import { Database, Frame } from "@/types";
import { createKysely } from "@vercel/postgres-kysely";
import { UUID } from "crypto";

const db = createKysely<Database>();

export const getMessage = async (
  id: string
): Promise<Frame | null | undefined> => {
  // Support for the legacy demo (used ints for id!)
  if (parseInt(id).toString() !== id) {
    const frame = await db
      .selectFrom("frames")
      .select(["frame", "id"])
      .where("id", "=", id as UUID)
      .executeTakeFirst();
    // @ts-expect-error
    return frame;
  }

  const paywallConfig = {
    pessimistic: true,
    persistentCheckout: true,
    title: "Unlock Community Membership",
    skipRecipient: true,
    locks: {
      "0xb77030a7e47a5eb942a4748000125e70be598632": {
        name: "Unlock Community",
        network: 137,
      },
    },
    metadataInputs: [{ name: "email", type: "email", required: true }],
  };

  return {
    // @ts-expect-error
    id: "1",
    frame: {
      title: "Some title",
      body: `👏 You're in the secret! 🤫. 

      You can only view this if you own a valid membership NFT from the Unlock community!
  
      This is a token gated frame!
      `,
      description: "Are you a member of the Unlock Community? Click Reveal 🔓!",
      denied:
        "You are not a member of the Unlock Community. Click below to get the free token!",
      gate: {
        contract: "0xb77030a7e47a5eb942a4748000125e70be598632",
        network: 137,
      },
      checkoutUrl: `https://app.unlock-protocol.com/checkout?paywallConfig=${encodeURIComponent(
        JSON.stringify(paywallConfig)
      )}`,
    },
  };
};
