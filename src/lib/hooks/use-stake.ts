import { gameManagerAbi } from "@/abi/game-manager";
import { gameManagerAddress } from "@/addresses";
import { useWriteContract } from "wagmi";

export const useStake = () => {
  const { writeContractAsync, ...props } = useWriteContract();

  return {
    ...props,
    stake: async ({ amount }: { amount: bigint }) =>
      writeContractAsync({
        address: gameManagerAddress,
        abi: gameManagerAbi,
        functionName: "enterCompetition",
        args: [],
      }),
  }
};
