import { useWriteLidoCloneSwapEthForWstEth } from "@/abi";

export const useStake = () => {
  const { writeContract, ...props } = useWriteLidoCloneSwapEthForWstEth();

  return {
    ...props,
    stake: async ({ amount }: { amount: bigint }) =>
      writeContract({
        args: [amount],
      }),
  }
};
