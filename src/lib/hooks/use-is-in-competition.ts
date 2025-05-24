import { Address } from "viem";
import { useReadGameManagerPlayers } from "@/abi";
import { useAccount } from "wagmi";

export const useIsInCompetition = () => {
  const { address: userAddress } = useAccount();
  const { data, isLoading } = useReadGameManagerPlayers({
    args: [userAddress as Address],
    query: {
      enabled: !!userAddress,
      refetchInterval: 3000,
    },
  });

  const [isRegistered] = data || [undefined];
  return { isRegistered, isLoading };
};
