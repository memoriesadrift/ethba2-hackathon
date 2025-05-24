"use client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { WagmiProvider } from "@privy-io/wagmi";
import { wagmiConfig } from "../configs/wagmi";
import { baseSepolia } from "wagmi/chains";

type Props = {
  children: ReactNode;
};

export const Providers = ({ children }: Props) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
      config={{
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
        defaultChain: baseSepolia,
        supportedChains: [baseSepolia],
        loginMethods: ["email", "wallet"],
        appearance: {
          theme: "#121419",
          accentColor: "#FE7E3A",
          loginMessage: "Welcome to SanBoxFi!",
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
};
