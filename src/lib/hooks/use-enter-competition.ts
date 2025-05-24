import { useWriteGameManagerEnterCompetition } from "@/abi";

export const useEnterCompetition = () => {
  const { writeContract, ...props } = useWriteGameManagerEnterCompetition();

  return {
    ...props,
    handleEnterCompetition: () => writeContract({}),
  };
};
