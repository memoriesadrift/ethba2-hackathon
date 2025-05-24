import { gameManagerAbi } from "@/abi/game-manager";
import { gameManagerAddress } from "@/addresses";
import { useWriteContract } from "wagmi";

export const useEnterCompetition = () => {
  const { writeContractAsync } = useWriteContract();

  console.log({ gameManagerAddress });

  const handleEnterCompetition = async () =>
    writeContractAsync({
      address: gameManagerAddress,
      abi: gameManagerAbi,
      functionName: "enterCompetition",
      args: [],
    });

  return {
    handleEnterCompetition,
  };
};
