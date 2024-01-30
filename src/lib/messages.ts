export const getMessage = async (id: string) => {
  return {
    id,
    body: `👏 You're in the secret! 🤫. 

    You can only view this if you own a valid membership NFT from the Unlock community!

Also this supports [Markdown](https://www.markdownguide.org/), so you _can_ **style** it!`,
    title: "Some title",
    description: "Are you a member of the Unlock Community?",
    gate: {
      contract: "0xb77030a7e47a5eb942a4748000125e70be598632",
      network: 137,
    },
  };
};
