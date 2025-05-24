import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award } from "lucide-react";

const leaderboardData = [
  {
    rank: 1,
    address: "0x742d35Cc6634C0532925a3b8D4C9db96590c6C87",
    amount: 2847392.45,
  },
  {
    rank: 2,
    address: "0x8ba1f109551bD432803012645Hac136c22C501e",
    amount: 1923847.12,
  },
  {
    rank: 3,
    address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    amount: 1456789.33,
  },
  {
    rank: 4,
    address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    amount: 987654.21,
  },
  {
    rank: 5,
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    amount: 756432.89,
  },
];

function formatAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function formatAmount(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Trophy className="h-5 w-5 text-yellow-500" />;
    case 2:
      return <Medal className="h-5 w-5 text-gray-400" />;
    case 3:
      return <Award className="h-5 w-5 text-amber-600" />;
    default:
      return null;
  }
}

function getRankBadge(rank: number) {
  const variants = {
    1: "default",
    2: "secondary",
    3: "outline",
  } as const;

  return (
    <Badge
      variant={variants[rank as keyof typeof variants] || "outline"}
      className="w-8 h-8 rounded-full flex items-center justify-center p-0"
    >
      {rank}
    </Badge>
  );
}

export default function Leaderboard() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Top Contributors</CardTitle>
          <p className="text-muted-foreground">Leaderboard by total value</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaderboardData.map((user) => (
              <div
                key={user.address}
                className={`flex items-center justify-between p-4 rounded-lg border transition-colors hover:bg-muted/50 gap-4 ${
                  user.rank === 1 ? "bg-muted/30" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {getRankBadge(user.rank)}
                    {getRankIcon(user.rank)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-sm font-medium">
                      {formatAddress(user.address)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Rank #{user.rank}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">
                    {formatAmount(user.amount)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
