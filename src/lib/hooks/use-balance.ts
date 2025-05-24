import { gameManagerAbi } from "@/abi/game-manager";
import { gameManagerAddress } from "@/addresses";
import { useAccount, useReadContract, useWriteContract } from "wagmi";

export const useFakeEthBalance = () => {
  const { address } = useAccount()
  return useReadContract({
    address: gameManagerAddress,
    abi: gameManagerAbi,
    functionName: "balanceOf",
    args: [address!],
    query: {
      enabled: !!address,
    }
  });
};
