import { useWriteLidoCloneSwapWstEthForEth } from "@/abi";

export const useUnstake = () => {
  const { writeContract, ...props } = useWriteLidoCloneSwapWstEthForEth();

  return {
    ...props,
    unstake: async ({ amount }: { amount: bigint }) =>
      writeContract({
        args: [amount],
      }),
  }
};
