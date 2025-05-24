"use client";

import { DataTable } from "@/components/table/data-table";
import { useDashboardTableColumns } from "./dashboard-table-columns";
import { Card, CardContent } from "@/components/ui/card";
import TokenSwap from "@/components/swap/token-swap";
import { Button } from "@/components/ui/button";
import { useEnterCompetition } from "@/lib/hooks/use-enter-competition";
import { useLeaveCompetition } from "@/lib/hooks/use-leave-competition";
import { CompetitionButton } from "@/components/competition-button";
import { tokens } from "@/mocks/tokens";

export type DataTableRow = {
  id: string;
  tokenAddress: string;
  tokenImageUrl: string;
  amount: number;
  symbol: string;
};

const MOCKED_DATA = [
  {
    id: "0x1234567890abcdef1234567890abcdef12345678",
    tokenAddress: "0x1234567890abcdef1234567890abcdef12345678",
    tokenImageUrl: "/mocks/ethLogo.png",
    amount: 100,
    symbol: "ETH",
  },
  {
    id: "0xabcdef1234567890abcdef1234567890abcdef12",
    tokenAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
    tokenImageUrl: "/mocks/ethLogo.png",
    amount: 50,
    symbol: "DAI",
  },
  {
    id: "0x7890abcdef1234567890abcdef1234567890abcd",
    tokenAddress: "0x7890abcdef1234567890abcdef1234567890abcd",
    tokenImageUrl: "/mocks/ethLogo.png",
    amount: 200,
    symbol: "USDC",
  },
];

export const Dashboard = () => {
  const columns = useDashboardTableColumns();
  return (
    <>
      <Card>
        <CardContent>
          <DataTable data={tokens} columns={columns} />
        </CardContent>
      </Card>
      <TokenSwap />
      <div className="flex gap-2">
        <CompetitionButton />
      </div>
    </>
  );
};
