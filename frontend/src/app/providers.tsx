"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { WagmiProvider } from "@privy-io/wagmi";
import { wagmiConfig } from "../configs/wagmi";

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
          createOnLogin: "all-users",
        },
        loginMethods: ["email", "wallet"],
        appearance: {
          walletList: ["metamask", "phantom", "rabby_wallet", "rainbow"],
          theme: "#121419",
          accentColor: "#FE7E3A",
          loginMessage: "Welcome to SanBoxFi!",
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
};
