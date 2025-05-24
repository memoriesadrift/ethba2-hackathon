import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";
import { StakingInterface } from "./forms";

const StakingHeader = () => (
  <section className="container mx-auto px-4 py-12 md:py-20">
    <div className="text-center max-w-4xl mx-auto">
      <Badge variant="secondary" className="mb-4 bg-slate-800 text-slate-300">
        <TrendingUp className="w-3 h-3 mr-1" />
        5.2% APR
      </Badge>
      <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">
        Liquid Ethereum Staking
      </h1>
      <p className="text-xl text-slate-400 leading-relaxed">
        Stake your SandboxFi wETH and receive wstETH that you can further trade. Earn
        staking rewards without locking up your assets.
      </p>
    </div>
  </section>
);

const HowItWorksSection = () => (
  <section className="container mx-auto px-4 py-16">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold mb-4 text-slate-100">How It Works</h2>
      <p className="text-slate-400 max-w-2xl mx-auto">
        Lido offers liquid ETH staking on mainnet, which allows you to earn yield while not forfeiting use of your ETH. It's useful if you want to work further on the market, but earn yield when you aren't trading. SandboxFi allows you to test the waters with Lido for a safe yield as well as letting you experiment with other options!
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="text-center p-6 bg-slate-900 rounded-lg border border-slate-800">
        <div className="w-16 h-16 bg-gradient-to-r from-sky-600 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-100 font-bold text-xl">
          1
        </div>
        <h3 className="text-xl font-semibold mb-3 text-slate-100">Stake ETH</h3>
        <p className="text-slate-400">
          Connect your wallet and stake any amount of ETH to start earning
          rewards
        </p>
      </div>

      <div className="text-center p-6 bg-slate-900 rounded-lg border border-slate-800">
        <div className="w-16 h-16 bg-gradient-to-r from-sky-600 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-100 font-bold text-xl">
          2
        </div>
        <h3 className="text-xl font-semibold mb-3 text-slate-100">
          Receive stETH
        </h3>
        <p className="text-slate-400">
          Get stETH tokens representing your staked ETH that you can use in DeFi
        </p>
      </div>

      <div className="text-center p-6 bg-slate-900 rounded-lg border border-slate-800">
        <div className="w-16 h-16 bg-gradient-to-r from-sky-600 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-100 font-bold text-xl">
          3
        </div>
        <h3 className="text-xl font-semibold mb-3 text-slate-100">
          Earn Rewards
        </h3>
        <p className="text-slate-400">
          Your stETH balance grows daily as you earn staking rewards
          automatically
        </p>
      </div>
    </div>
  </section>
);

export default function LidoStakingClone() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-slate-200">
      <StakingHeader />
      <section className="container mx-auto px-4 pb-12 md:pb-20">
        <StakingInterface />
      </section>
      <HowItWorksSection />
    </div>
  );
}
