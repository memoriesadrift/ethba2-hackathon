"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useAccount } from "wagmi";
import { Check, CopyIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const formatAddress = (address: string) => {
  return `${address.slice(0, 5)}...${address.slice(-4)}`;
};

export const ConnectWalletButton = () => {
  const { login, ready, authenticated } = usePrivy();
  const { address: userAddress } = useAccount();
  const [isCopied, setIsCopied] = useState(false);
  const isLoggedIn = ready && authenticated && userAddress;

  if (!isLoggedIn) {
    return <Button onClick={login}>Connect Wallet</Button>;
  }

  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(userAddress);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <Button variant="secondary" onClick={copyAddressToClipboard}>
      <div className="flex gap-2 items-center">
        {formatAddress(userAddress)}
        {isCopied ? <Check /> : <CopyIcon />}
      </div>
    </Button>
  );
};
