import { createPublicClient, http } from "viem";

export const balanceOf = async (
  user: `0x${string}`,
  contract: `0x${string}`,
  network: number
) => {
  const client = createPublicClient({
    transport: http(`https://rpc.unlock-protocol.com/${network}`),
  });
  return await client.readContract({
    abi: [
      {
        inputs: [
          { internalType: "address", name: "_keyOwner", type: "address" },
        ],
        name: "balanceOf",
        outputs: [
          { internalType: "uint256", name: "balance", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    address: contract,
    functionName: "balanceOf",
    args: [user],
  });
};
