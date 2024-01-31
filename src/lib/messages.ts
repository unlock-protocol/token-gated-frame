export const getMessage = async (id: string) => {
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
    id,
    body: `👏 You're in the secret! 🤫. 

    You can only view this if you own a valid membership NFT from the Unlock community!

    This is a token gated frame!
    `,
    title: "Some title",
    description: "Are you a member of the Unlock Community? Click Reveal 🔓!",
    gate: {
      contract: "0xb77030a7e47a5eb942a4748000125e70be598632",
      network: 137,
    },
    checkoutUrl: `https://app.unlock-protocol.com/checkout?paywallConfig=${encodeURIComponent(
      JSON.stringify(paywallConfig)
    )}`,
  };
};
