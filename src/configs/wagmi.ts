import { createConfig } from "@privy-io/wagmi";
import { http } from "wagmi";
import { anvil, foundry } from "wagmi/chains";

export const wagmiConfig = createConfig({
  chains: [foundry],
  transports: {
    [foundry.id]: http(),
    // [baseSepolia.id]: http(),
  },
});
