import { useEnterCompetition } from "@/lib/hooks/use-enter-competition";
import { useIsInCompetition } from "@/lib/hooks/use-is-in-competition";
import { useLeaveCompetition } from "@/lib/hooks/use-leave-competition";
import { useAccount } from "wagmi";
import { Button } from "./ui/button";
import { ConnectWalletButton } from "./connect-wallet-button";

export const CompetitionButton = () => {
  const { address: userAddress } = useAccount();
  const { isRegistered, isLoading } = useIsInCompetition();
  const { handleEnterCompetition } = useEnterCompetition();
  const { handleLeaveCompetition } = useLeaveCompetition();

  // console.log({ isRegistered, isLoading });

  // if (!userAddress) return <ConnectWalletButton />;
  // if (isLoading) return <Button disabled>Loading...</Button>;
  // if (isRegistered)
  //   return (
  //     <Button className="bg-red-500" onClick={handleLeaveCompetition}>
  //       Leave Competition
  //     </Button>
  //   );

  return <Button onClick={handleEnterCompetition}>Enter Competition</Button>;
};
