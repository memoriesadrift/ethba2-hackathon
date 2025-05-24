import { useReadTokenManagerBalanceOf } from "@/abi";

import { useAccount } from "wagmi";

export const Tokens = {
  USCD: 0n,
  ETH: 1n,
  wstETH: 2n,
} as const

export const useFakeBalance = (token: keyof typeof Tokens) => {
  const { address } = useAccount()
  return useReadTokenManagerBalanceOf({
    args: [address!, Tokens[token]],
    query: {
      enabled: !!address,
    }
  });
};
