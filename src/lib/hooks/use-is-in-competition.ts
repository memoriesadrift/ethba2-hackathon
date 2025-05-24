import { gameManagerAbi } from "@/abi/game-manager";
import { gameManagerAddress } from "@/addresses";
import { Address } from "viem";
import { useAccount, useReadContract } from "wagmi";

export const useIsInCompetition = () => {
  const { address: userAddress } = useAccount();
  const { data, isLoading } = useReadContract({
    address: gameManagerAddress,
    abi: gameManagerAbi,
    functionName: "players",
    args: [userAddress as Address],
    query: {
      enabled: !!userAddress,
      refetchInterval: 3000,
    },
  });

  const [isRegistered] = data || [undefined];
  return { isRegistered, isLoading };
};
