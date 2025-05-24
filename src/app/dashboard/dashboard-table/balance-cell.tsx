import { useReadTokenManagerBalanceOf } from "@/abi";
import { Address } from "viem";
import { useAccount } from "wagmi";

export const BalanceCell = ({ id }: { id: string }) => {
  const { address } = useAccount();
  const { data } = useReadTokenManagerBalanceOf({
    args: [address as Address, BigInt(id)],
    query: {
      enabled: !!address,
      refetchInterval: 3000,
    },
  });

  return <div>{data}</div>;
};
