"use client";

import { gameManagerConfig, useWriteGameManagerSubmitScore } from "@/abi";
import { useReadContracts } from "wagmi";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Coins, Users, Calendar } from "lucide-react";
import { formatAddress } from "@/lib/utils";

const useGetPlayers = () => {
  const { data } = useReadContracts({
    contracts: [0n, 1n, 2n, 3n, 4n].map(
      (index) =>
        ({
          ...gameManagerConfig,
          functionName: "getTop5Players",
          args: [index],
        }) as const
    ),
  });
  if (!data) return;

  return data.map(
    ({ result }: { result: any }) =>
      result &&
      ({
        playerAddress: result[0],
        isRegistered: result[1],
        registeredAt: result[2].toNumber(),
        leftAt: result[3].toNumber(),
        score: result[4].toNumber(),
      } as Player)
  );
};

interface Player {
  playerAddress: string;
  isRegistered: boolean;
  registeredAt: number;
  leftAt: number;
  score: number;
}

// Mock data based on the blockchain struct
const mockPlayers: Player[] = [
  {
    playerAddress: "0x742d35Cc6634C0532925a3b8D4C2C4e4C4C4C4C4",
    isRegistered: true,
    registeredAt: 1703980800,
    leftAt: 0,
    score: 125000,
  },
  {
    playerAddress: "0x8ba1f109551bD432803012645Hac189451c4C4C4",
    isRegistered: true,
    registeredAt: 1703894400,
    leftAt: 0,
    score: 98500,
  },
  {
    playerAddress: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    isRegistered: true,
    registeredAt: 1703808000,
    leftAt: 0,
    score: 87200,
  },
  {
    playerAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    isRegistered: true,
    registeredAt: 1703721600,
    leftAt: 0,
    score: 76800,
  },
  {
    playerAddress: "0xA0b86a33E6441E6C7D3E4C4C4C4C4C4C4C4C4C4C",
    isRegistered: true,
    registeredAt: 1703635200,
    leftAt: 0,
    score: 65400,
  },
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="w-6 h-6 text-yellow-400" />;
    case 2:
      return <Medal className="w-6 h-6 text-gray-300" />;
    case 3:
      return <Award className="w-6 h-6 text-amber-600" />;
    default:
      return (
        <div className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-400">
          #{rank}
        </div>
      );
  }
};

export default function Leaderboard() {
  const { writeContract: submitScore, isPending } =
    useWriteGameManagerSubmitScore();
  const topPlayers = mockPlayers; // useGetPlayers();

  const formatScore = (score: number) => {
    return new Intl.NumberFormat("en-US").format(score);
  };

  const totalPlayers = mockPlayers.filter((p) => p.isRegistered).length;
  const totalPrizePool = mockPlayers.reduce(
    (sum, player) => sum + player.score,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(9,9,11)] via-gray-900 to-black p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full">
              <Trophy className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Money Masters Leaderboard
            </h1>
          </div>
          <p className="text-gray-300 text-lg mb-6">
            Compete to earn the most in-game currency and claim your spot among
            the elite players
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  {totalPlayers}
                </div>
                <div className="text-sm text-gray-400">Active Players</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <Coins className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  {formatScore(totalPrizePool)}
                </div>
                <div className="text-sm text-gray-400">Total Prize Pool</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <Calendar className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">24h</div>
                <div className="text-sm text-gray-400">Competition Cycle</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Leaderboard */}
        <Card className="bg-gray-800/30 border-gray-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-400" />
              Top 5 Money Masters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topPlayers?.map((player, index) => {
              const rank = index + 1;
              return (
                <div
                  key={player.playerAddress}
                  className={`flex items-center justify-between p-4 rounded-lg transition-all hover:scale-[1.02] ${
                    rank === 1
                      ? "bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border border-yellow-400/30"
                      : rank === 2
                        ? "bg-gradient-to-r from-gray-300/20 to-gray-400/20 border border-gray-300/30"
                        : rank === 3
                          ? "bg-gradient-to-r from-amber-600/20 to-amber-700/20 border border-amber-600/30"
                          : "bg-gray-700/30 border border-gray-600/30"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {getRankIcon(rank)}
                    <div>
                      <div className="font-mono text-white font-medium">
                        {formatAddress(player.playerAddress)}
                      </div>
                      <div className="text-sm text-gray-400">
                        Registered{" "}
                        {new Date(
                          player.registeredAt * 1000
                        ).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-white flex items-center gap-2">
                      <Coins className="w-5 h-5 text-yellow-400" />
                      {formatScore(player.score)}
                    </div>
                    {rank <= 3 && (
                      <Badge variant="secondary" className="mt-1">
                        {rank === 1
                          ? "Champion"
                          : rank === 2
                            ? "Runner-up"
                            : "Third Place"}
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Submit Results Button */}
        <div className="text-center mt-8">
          <Button
            onClick={() => submitScore({})}
            disabled={isPending}
            size="lg"
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-8 py-3 text-lg"
          >
            {isPending ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                Submitting Results...
              </>
            ) : (
              <>
                <Trophy className="w-5 h-5 mr-2" />
                Submit Results & Join Leaderboard
              </>
            )}
          </Button>
          <p className="text-gray-400 text-sm mt-2">
            Connect your wallet and submit your latest game results to compete
            for the top spot
          </p>
        </div>
      </div>
    </div>
  );
}
