"use client";
import { WagmiProvider, createConfig } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { AppConfig } from "../AppConfig";
import networks from "@unlock-protocol/networks";
import { defineChain } from "viem";

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    // @ts-expect-error
    chains: Object.keys(networks).map((id: string) => {
      const network = networks[id];
      return defineChain({
        id: parseInt(id),
        name: network.name,
        nativeCurrency: network.nativeCurrency,
        rpcUrls: {
          default: {
            http: network.publicProvider,
          },
        },
      });
    }),
    transports: {
      // // RPC URL for each chain
      // [mainnet.id]: http(
      //   `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
      // ),
    },

    // Required App Info
    appName: AppConfig.name,

    // Optional App Info
    appDescription: AppConfig.description,
    appUrl: AppConfig.siteUrl, // your app's url
  })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
