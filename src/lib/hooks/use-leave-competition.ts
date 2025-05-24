import { gameManagerAbi } from "@/abi/game-manager";
import { gameManagerAddress } from "@/addresses";
import { useWriteContract } from "wagmi";

export const useLeaveCompetition = () => {
  const { writeContractAsync } = useWriteContract();

  const handleLeaveCompetition = async () =>
    writeContractAsync({
      address: gameManagerAddress,
      abi: gameManagerAbi,
      functionName: "leaveCompetition",
      args: [],
    });

  return {
    handleLeaveCompetition,
  };
};
