import { useReadTokenManagerBalanceOf } from "@/abi";

import { useAccount } from "wagmi";

export const Tokens = {
  USCD: 0n,
  ETH: 1n,
  wstETH: 2n,
} as const

export const useFakeBalance = (token: keyof typeof Tokens | bigint) => {
  const { address } = useAccount()
  return useReadTokenManagerBalanceOf({
    args: [address!, typeof token === 'string' ? Tokens[token] : token],
    query: {
      enabled: !!address,
    }
  });
};
