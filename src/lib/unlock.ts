import { createPublicClient, http } from "viem";
import { ABIs } from "./abis";

export const meetsRequirement = async (user: `0x${string}`, gate: any) => {
  const client = createPublicClient({
    transport: http(`https://rpc.unlock-protocol.com/${gate.network}`),
  });

  const abi = ABIs[(gate.type || "ERC721") as keyof typeof ABIs];
  const args = gate.type === "ERC1155" ? [user, gate.token] : [user];
  const balance = (await client.readContract({
    abi: abi,
    address: gate.contract,
    functionName: "balanceOf",
    args,
  })) as number;
  const requiredBalance =
    typeof gate.balance === "undefined" ? 1 : parseInt(gate.balance);
  return balance > requiredBalance;
};
