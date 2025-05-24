"use client";

import { useState } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TokenSelector } from "./token-selector";
import { tokens } from "@/mocks/tokens";
import {
  useSimulateUniswapV2Router02Clone,
  useWriteUniswapV2Router02Clone,
} from "@/abi";
import { useAccount, useSimulateContract } from "wagmi";
import { Address } from "viem";

export default function TokenSwap() {
  const { address: userAddress } = useAccount();
  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[1]);
  // const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [slippage, setSlippage] = useState(0.5);

  console.log({ x: BigInt(Math.floor(Date.now() / 1000) + 60 * 20) });

  const { data } = useSimulateUniswapV2Router02Clone({
    functionName: "swapTokensForExactTokens",
    args: [
      BigInt(toAmount || "0"),
      BigInt(100000000000000000),
      [fromToken.address, toToken.address],
      userAddress as Address,
      BigInt(Math.floor(Date.now() / 1000) + 60 * 20), // deadline 20 minutes from now
    ],
  });

  const [fromAmount] = data?.result ?? [BigInt(0)];

  const { writeContract: swapUniswapV2Router02Clone } =
    useWriteUniswapV2Router02Clone();

  // Simulate price calculation
  // const calculateToAmount = (amount: string) => {
  //   if (!amount || isNaN(Number.parseFloat(amount))) return "";
  //   // Mock exchange rate - in a real app this would come from an API or blockchain
  //   const rate = fromToken.price / toToken.price;
  //   return (Number.parseFloat(amount) * rate).toFixed(6);
  // };

  // const handleFromAmountChange = (value: string) => {
  //   setFromAmount(value);
  //   setToAmount(calculateToAmount(value));
  // };

  const handleSwapTokens = () => {
    // const temp = fromToken;
    // setFromToken(toToken);
    // setToToken(temp);

    // // Recalculate amounts
    // if (fromAmount) {
    //   const newToAmount = calculateToAmount(fromAmount);
    //   setToAmount(newToAmount);
    // }

    swapUniswapV2Router02Clone({
      functionName: "swapTokensForExactTokens",
      args: [
        BigInt(toAmount || "0"),
        BigInt(100000000000000000),
        [fromToken.address, toToken.address],
        userAddress as Address,
        BigInt(Math.floor(Date.now() / 1000) + 60 * 20), // deadline 20 minutes from now
      ],
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <h2 className="text-xl font-bold">Swap</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-xl">
          <div className="flex justify-between mb-2">
            <span className="text-sm">From</span>
          </div>
          <div className="flex items-center gap-2 w-full">
            <Input
              type="text"
              readOnly
              placeholder="0.0"
              value={String(fromAmount)}
              className="border-none bg-transparent text-2xl font-medium placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
            />
            <TokenSelector
              selectedToken={fromToken}
              onSelectToken={setFromToken}
              otherToken={toToken}
            />
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="absolute -mt-3 rounded-full p-1.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSwapTokens}
              className="h-6 w-6 rounded-full hover:text-white"
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="rounded-xl">
          <div className="flex justify-between mb-2">
            <span className="text-sm ">To</span>
          </div>
          <div className="flex items-center gap-2 w-full">
            <Input
              type="text"
              placeholder="0.0"
              value={toAmount}
              onChange={(e) => setToAmount(e.target.value)}
              className="border-none bg-transparent text-2xl font-medium placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
            />
            <TokenSelector
              selectedToken={toToken}
              onSelectToken={setToToken}
              otherToken={fromToken}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full text-black font-semibold h-12 rounded-xl"
          disabled={!toAmount || Number.parseFloat(toAmount) <= 0}
          onClick={handleSwapTokens}
        >
          Swap
        </Button>
      </CardFooter>
    </Card>
  );
}
