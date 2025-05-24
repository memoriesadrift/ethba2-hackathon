import { useWriteGameManagerLeaveCompetition } from "@/abi/";

export const useLeaveCompetition = () => {
  const { writeContract, ...props } = useWriteGameManagerLeaveCompetition();

  return {
    ...props,
    handleLeaveCompetition: () => writeContract({}),
  };
};
