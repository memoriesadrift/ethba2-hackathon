import { tokenManagerAbi, tokenManagerConfig, useReadTokenManagerBalanceOf } from "@/abi";

import { useAccount, useReadContracts } from "wagmi";

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

export const useFakeBalances = (tokens: (keyof typeof Tokens | bigint)[]) => {
  const { address } = useAccount()
  return useReadContracts({
    contracts: tokens.map(token => ({
      ...tokenManagerConfig,
      functionName: 'balanceOf',
      args: [address!, typeof token === 'string' ? Tokens[token] : token],
    } as const)),
    query: {
      enabled: !!address,
    }
  })
}