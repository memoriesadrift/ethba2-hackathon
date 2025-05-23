"use client";

import { useState } from "react";
import { ArrowDown, Cog } from "lucide-react";
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

export default function TokenSwap() {
  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[1]);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [slippage, setSlippage] = useState(0.5);

  // Simulate price calculation
  const calculateToAmount = (amount: string) => {
    if (!amount || isNaN(Number.parseFloat(amount))) return "";
    // Mock exchange rate - in a real app this would come from an API or blockchain
    const rate = fromToken.price / toToken.price;
    return (Number.parseFloat(amount) * rate).toFixed(6);
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    setToAmount(calculateToAmount(value));
  };

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);

    // Recalculate amounts
    if (fromAmount) {
      const newToAmount = calculateToAmount(fromAmount);
      setToAmount(newToAmount);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <h2 className="text-xl font-bold">Swap</h2>
        <Button variant="ghost" size="icon">
          <Cog className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-xlp-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm">From</span>
            <span className="text-sm ">
              Balance: {fromToken.balance.toFixed(4)}
            </span>
          </div>
          <div className="flex items-center gap-2 w-full">
            <Input
              type="text"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
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
            <span className="text-sm text-gray-400">
              Balance: {toToken.balance.toFixed(4)}
            </span>
          </div>
          <div className="flex items-center gap-2 w-full">
            <Input
              type="text"
              placeholder="0.0"
              value={toAmount}
              readOnly
              className="border-none bg-transparent text-2xl font-medium placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
            />
            <TokenSelector
              selectedToken={toToken}
              onSelectToken={setToToken}
              otherToken={fromToken}
            />
          </div>
        </div>

        {fromAmount && toAmount && (
          <div className="rounded-lg p-3 text-sm">
            <div className="flex justify-between">
              <span>Price</span>
              <span>
                1 {fromToken.symbol} ={" "}
                {(fromToken.price / toToken.price).toFixed(6)} {toToken.symbol}
              </span>
            </div>
            <div className="flex justify-between mt-1">
              <span>Slippage Tolerance</span>
              <span>{slippage}%</span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full text-white font-semibold h-12 rounded-xl"
          disabled={!fromAmount || Number.parseFloat(fromAmount) <= 0}
        >
          Swap
        </Button>
      </CardFooter>
    </Card>
  );
}
