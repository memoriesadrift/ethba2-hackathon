"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Info } from "lucide-react";
import { formatEther, parseEther } from "viem";
import { useStake } from "@/lib/hooks/use-stake";
import { useFakeBalance } from "@/lib/hooks/use-balance";
import { useUnstake } from "@/lib/hooks/use-unstake";

const StakeTabContent = () => {
  const { data: balance } = useFakeBalance("ETH");
  const [stakeAmount, setStakeAmount] = useState("");
  const { stake, isPending } = useStake();

  return (
    <TabsContent value="stake" className="space-y-6 pt-6">
      <div className="space-y-4">
        <div>
          <Label
            htmlFor="stake-amount"
            className="text-sm font-medium text-slate-300"
          >
            Amount to stake
          </Label>
          <div className="relative mt-2">
            <Input
              id="stake-amount"
              placeholder="0.0"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              className="text-lg h-12 pr-16 bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-sky-500"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <span className="text-sm font-medium text-slate-400">ETH</span>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-slate-500">
            <span>Balance: {balance && formatEther(balance)} ETH</span>
            <button
              className="text-sky-400 hover:text-sky-300"
              type="button"
              onClick={() => balance && setStakeAmount(formatEther(balance))}
            >
              Max
            </button>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-4 space-y-2 border border-slate-700">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">You will receive</span>
            <span className="font-medium text-slate-100">
              {stakeAmount || "0.0"} stETH
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Exchange rate</span>
            <span className="text-slate-100">1 ETH = 1 stETH</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Annual percentage rate</span>
            <span className="text-green-400 font-medium">5.2%</span>
          </div>
        </div>

        <Button
          className="w-full h-12 text-lg bg-gradient-to-r from-sky-600 to-violet-600 hover:from-sky-700 hover:to-violet-700 text-white"
          disabled={!stakeAmount || isPending}
          onClick={() => {
            stake({ amount: parseEther(stakeAmount) });
          }}
        >
          Stake ETH
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </TabsContent>
  );
};

const UnstakeTabContent = () => {
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const { data: balance } = useFakeBalance("wstETH");
  const { unstake, isPending } = useUnstake();

  return (
    <TabsContent value="unstake" className="space-y-6 pt-6">
      <div className="space-y-4">
        <div>
          <Label
            htmlFor="unstake-amount"
            className="text-sm font-medium text-slate-300"
          >
            Amount to unstake
          </Label>
          <div className="relative mt-2">
            <Input
              id="unstake-amount"
              placeholder="0.0"
              value={unstakeAmount}
              onChange={(e) => setUnstakeAmount(e.target.value)}
              className="text-lg h-12 pr-20 bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-sky-500"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <span className="text-sm font-medium text-slate-400">stETH</span>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-slate-500">
            <span>Balance: {balance} wstETH</span>
            <button
              className="text-sky-400 hover:text-sky-300"
              onClick={() => balance && unstake({ amount: balance })}
            >
              Max
            </button>
          </div>
        </div>

        {/* <div className="bg-amber-500/10 border border-amber-700/30 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <Info className="w-4 h-4 text-amber-400 mt-0.5" />
            <div className="text-sm text-amber-300">
              <p className="font-medium mb-1 text-amber-200">
                Unstaking Period
              </p>
              <p>
                Unstaking requests are processed within 1-5 days. You can also
                swap stETH for ETH instantly on DEXs.
              </p>
            </div>
          </div>
        </div> */}

        <Button
          className="w-full h-12 text-lg border-slate-700 text-slate-100 hover:bg-slate-800 bg-slate-800/50"
          variant="outline"
          disabled={!unstakeAmount || isPending}
          onAbort={() => unstake({ amount: parseEther(unstakeAmount) })}
        >
          Unstake
        </Button>
      </div>
    </TabsContent>
  );
};

export const StakingInterface = () => {
  return (
    <div className="max-w-lg mx-auto">
      <Card className="border-slate-700 shadow-2xl bg-slate-900/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-slate-100">
            Stake ETH
          </CardTitle>
          <CardDescription className="text-center text-slate-400">
            Stake your ETH to earn rewards and receive liquid stETH tokens
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="stake" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-800">
              <TabsTrigger
                value="stake"
                className="data-[state=active]:bg-slate-700 text-slate-300 data-[state=active]:text-slate-100"
              >
                Stake
              </TabsTrigger>
              <TabsTrigger
                value="unstake"
                className="data-[state=active]:bg-slate-700 text-slate-300 data-[state=active]:text-slate-100"
              >
                Unstake
              </TabsTrigger>
            </TabsList>
            <StakeTabContent />
            <UnstakeTabContent />
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
