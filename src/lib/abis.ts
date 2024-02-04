export const ABIs = {
  ERC721: [
    {
      inputs: [{ internalType: "address", name: "_keyOwner", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "balance", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  ],
  ERC20: [
    {
      inputs: [{ internalType: "address", name: "_keyOwner", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "balance", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint256", name: "balance", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  ],
  ERC1155: [
    {
      inputs: [
        { internalType: "address", name: "_keyOwner", type: "address" },
        {
          internalType: "uint256",
          name: "token",
          type: "uint256",
        },
      ],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "balance", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  ],
};
