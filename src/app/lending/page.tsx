"use client";

import { CryptoIcon } from "@ledgerhq/crypto-icons";
import React, { useState, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Plus,
  Minus,
  Info,
  Shield,
  Zap,
  DollarSign,
} from "lucide-react";

interface AssetType {
  symbol: string;
  name: string;
  icon: React.ReactNode;
  supplyAPY: number;
  borrowAPY: number;
  totalSupplied: string;
  totalBorrowed: string;
  liquidity: string;
  walletBalance: string;
  supplied: string;
  borrowed: string;
  ltv: number;
  canBeCollateral: boolean;
}

const assets: AssetType[] = [
  {
    symbol: "ETH",
    name: "Ethereum",
    icon: <CryptoIcon ledgerId="ethereum" ticker="ETH" size="24px" />,
    supplyAPY: 2.45,
    borrowAPY: 3.12,
    totalSupplied: "12.5M",
    totalBorrowed: "8.2M",
    liquidity: "4.3M",
    walletBalance: "2.5",
    supplied: "0",
    borrowed: "0",
    ltv: 82.5,
    canBeCollateral: true,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    icon: (
      <CryptoIcon ledgerId="base/erc20/usd_coin" ticker="USDC" size="24px" />
    ),
    supplyAPY: 4.23,
    borrowAPY: 5.67,
    totalSupplied: "45.2M",
    totalBorrowed: "32.1M",
    liquidity: "13.1M",
    walletBalance: "1,250.00",
    supplied: "500.00",
    borrowed: "0",
    ltv: 87.0,
    canBeCollateral: true,
  },
  {
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    icon: (
      <CryptoIcon
        ledgerId="ethereum/erc20/wrapped_bitcoin"
        ticker="WBTC"
        size="24px"
      />
    ),
    supplyAPY: 1.89,
    borrowAPY: 2.95,
    totalSupplied: "2.1M",
    totalBorrowed: "1.4M",
    liquidity: "700K",
    walletBalance: "0.05",
    supplied: "0",
    borrowed: "0",
    ltv: 75.0,
    canBeCollateral: true,
  },
];

// Header Stat Card
interface HeaderStatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  iconBgClass: string;
  iconClass: string;
  valueClass?: string;
}

const HeaderStatCard: React.FC<HeaderStatCardProps> = ({
  title,
  value,
  icon,
  iconBgClass,
  iconClass,
  valueClass = "",
}) => (
  <Card className="bg-zinc-900 border-zinc-800">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-400">{title}</p>
          <p className={`text-2xl font-bold ${valueClass}`}>{value}</p>
        </div>
        <div className={`p-2 ${iconBgClass} rounded-lg`}>{icon}</div>
      </div>
    </CardContent>
  </Card>
);

// Header Stats Container
interface HeaderStatsProps {
  totalSupplied: number;
  totalBorrowed: number;
  netAPY: number;
  healthFactor: number;
}

const HeaderStats: React.FC<HeaderStatsProps> = ({
  totalSupplied,
  totalBorrowed,
  netAPY,
  healthFactor,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <HeaderStatCard
      title="Total Supplied"
      value={`$${totalSupplied.toLocaleString()}`}
      icon={<TrendingUp />}
      iconBgClass="bg-green-500/10"
      iconClass="text-green-500"
    />
    <HeaderStatCard
      title="Total Borrowed"
      value={`$${totalBorrowed.toLocaleString()}`}
      icon={<TrendingDown />}
      iconBgClass="bg-red-500/10"
      iconClass="text-red-500"
    />
    <HeaderStatCard
      title="Net APY"
      value={`${netAPY}%`}
      icon={<DollarSign />}
      iconBgClass="bg-blue-500/10"
      iconClass="text-blue-500"
      valueClass="text-green-500"
    />
    <HeaderStatCard
      title="Health Factor"
      value={healthFactor.toString()}
      icon={<Shield />}
      iconBgClass="bg-green-500/10"
      iconClass="text-green-500"
      valueClass="text-green-500"
    />
  </div>
);

// Borrowing Power Display
interface BorrowingPowerDisplayProps {
  totalBorrowed: number;
  borrowingPower: number;
  borrowingPowerUsed: number;
}

const BorrowingPowerDisplay: React.FC<BorrowingPowerDisplayProps> = ({
  totalBorrowed,
  borrowingPower,
  borrowingPowerUsed,
}) => (
  <Card className="bg-zinc-900 border-zinc-800">
    <CardContent className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Borrowing Power</h3>
          <Badge variant="outline" className="border-zinc-700 text-zinc-300">
            {borrowingPowerUsed.toFixed(1)}% Used
          </Badge>
        </div>
        <Progress value={borrowingPowerUsed} className="h-2" />
        <div className="flex justify-between text-sm text-zinc-400">
          <span>${totalBorrowed.toLocaleString()} borrowed</span>
          <span>${borrowingPower.toLocaleString()} available</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Asset Action Dialog Content
interface AssetActionDialogContentProps {
  asset: AssetType;
  isSupplyMode: boolean;
  healthFactor: number; // Global health factor for borrow context
  // onAction: (amount: string, useAsCollateral?: boolean) => void; // Callback for actual transaction
}

const AssetActionDialogContent: React.FC<AssetActionDialogContentProps> = ({
  asset,
  isSupplyMode,
  healthFactor,
}) => {
  const [amount, setAmount] = useState("");
  const [useAsCollateral, setUseAsCollateral] = useState(asset.canBeCollateral);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Amount</Label>
        <div className="relative">
          <Input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-zinc-800 border-zinc-700 pr-16"
          />
          <Button
            size="sm"
            variant="ghost"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-400"
            onClick={() =>
              setAmount(
                isSupplyMode
                  ? asset.walletBalance
                  : asset.liquidity /* Consider max borrow logic */
              )
            }
          >
            MAX
          </Button>
        </div>
        <p className="text-sm text-zinc-400">
          {isSupplyMode ? "Balance" : "Available"}:{" "}
          {isSupplyMode ? asset.walletBalance : asset.liquidity} {asset.symbol}
        </p>
      </div>

      {isSupplyMode && asset.canBeCollateral && (
        <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg">
          <div className="flex items-center gap-2">
            <Switch
              checked={useAsCollateral}
              onCheckedChange={setUseAsCollateral}
              disabled={!asset.canBeCollateral}
            />
            <Label>Use as collateral</Label>
            <Info className="h-4 w-4 text-zinc-400" />
          </div>
        </div>
      )}

      <div className="space-y-3 p-4 bg-zinc-800 rounded-lg">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-400">
            {isSupplyMode ? "Supply APY" : "Borrow APY"}
          </span>
          <span className={isSupplyMode ? "text-green-500" : "text-red-500"}>
            {isSupplyMode ? asset.supplyAPY : asset.borrowAPY}%
          </span>
        </div>
        {isSupplyMode ? (
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Collateral Usage</span>
            <span>
              {asset.canBeCollateral && useAsCollateral
                ? "Enabled"
                : "Disabled"}
            </span>
          </div>
        ) : (
          <>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Health Factor</span>
              <span className="text-green-500">{healthFactor}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">LTV</span>
              <span>{asset.ltv}%</span>
            </div>
          </>
        )}
      </div>

      <Button
        className={`w-full ${
          isSupplyMode
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-red-600 hover:bg-red-700"
        }`}
        // onClick={() => onAction(amount, isSupplyMode ? useAsCollateral : undefined)}
      >
        {isSupplyMode ? "Supply" : "Borrow"} {asset.symbol}
      </Button>
    </div>
  );
};

// Assets Table (for Supply or Borrow)
interface AssetsTableProps {
  title: string;
  icon: ReactNode;
  assetsList: AssetType[];
  mode: "supply" | "borrow";
  onActionClick: (asset: AssetType) => void;
}

const AssetsTable: React.FC<AssetsTableProps> = ({
  title,
  icon,
  assetsList,
  mode,
  onActionClick,
}) => (
  <Card className="bg-zinc-900 border-zinc-800">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        {icon}
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">
                Asset
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">
                {mode === "supply" ? "Wallet Balance" : "Available"}
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">
                APY
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">
                {mode === "supply" ? "Can be Collateral" : "LTV"}
              </th>
              <th className="text-right py-3 px-4 text-sm font-medium text-zinc-400">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {assetsList.map((asset) => (
              <tr
                key={asset.symbol}
                className="border-b border-zinc-800/50 hover:bg-zinc-800/30"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{asset.icon}</span>
                    <div>
                      <p className="font-medium">{asset.symbol}</p>
                      <p className="text-sm text-zinc-400">{asset.name}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <p className="font-medium">
                    {mode === "supply" ? asset.walletBalance : asset.liquidity}
                  </p>
                  <p className="text-sm text-zinc-400">{asset.symbol}</p>
                </td>
                <td className="py-4 px-4">
                  <p
                    className={`font-medium ${mode === "supply" ? "text-green-500" : "text-red-500"}`}
                  >
                    {mode === "supply" ? asset.supplyAPY : asset.borrowAPY}%
                  </p>
                </td>
                <td className="py-4 px-4">
                  {mode === "supply" ? (
                    asset.canBeCollateral ? (
                      <Badge
                        variant="outline"
                        className="border-green-500/20 text-green-500"
                      >
                        Yes
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="border-zinc-700 text-zinc-400"
                      >
                        No
                      </Badge>
                    )
                  ) : (
                    <p className="font-medium">{asset.ltv}%</p>
                  )}
                </td>
                <td className="py-4 px-4 text-right">
                  <Button
                    size="sm"
                    className={
                      mode === "supply"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "border-zinc-700 hover:bg-zinc-800"
                    }
                    variant={mode === "borrow" ? "outline" : "default"}
                    onClick={() => onActionClick(asset)}
                  >
                    {mode === "supply" ? "Supply" : "Borrow"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
);

// User Positions Display (Supplies or Borrows)
interface UserPositionsDisplayProps {
  title: string;
  assetsList: AssetType[];
  mode: "supply" | "borrow";
  emptyState: {
    icon: ReactNode;
    text: string;
    subtext: string;
  };
}

const UserPositionsDisplay: React.FC<UserPositionsDisplayProps> = ({
  title,
  assetsList,
  mode,
  emptyState,
}) => {
  const relevantAssets = assetsList.filter(
    (asset) =>
      Number.parseFloat(mode === "supply" ? asset.supplied : asset.borrowed) > 0
  );

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {relevantAssets.length > 0 ? (
            relevantAssets.map((asset) => (
              <div
                key={asset.symbol}
                className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{asset.icon}</span>
                  <div>
                    <p className="font-medium">{asset.symbol}</p>
                    <p className="text-sm text-zinc-400">
                      {mode === "supply" ? asset.supplied : asset.borrowed}{" "}
                      {mode === "supply" ? "supplied" : "borrowed"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-medium ${mode === "supply" ? "text-green-500" : "text-red-500"}`}
                  >
                    {mode === "supply" ? asset.supplyAPY : asset.borrowAPY}% APY
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-2 border-zinc-700"
                  >
                    {mode === "supply" ? "Withdraw" : "Repay"}
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-zinc-400">
              {React.cloneElement(emptyState.icon as React.ReactElement, {
                className: "h-12 w-12 mx-auto mb-4 opacity-50",
              })}
              <p>{emptyState.text}</p>
              <p className="text-sm">{emptyState.subtext}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default function AaveClone() {
  const [selectedAssetForDialog, setSelectedAssetForDialog] =
    useState<AssetType | null>(null);
  const [isDialogSupplyMode, setIsDialogSupplyMode] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // These would typically come from a global state/context or API
  const totalSupplied = 12450.67;
  const totalBorrowed = 3200.45;
  const netAPY = 2.34;
  const healthFactor = 2.85; // This is a global health factor
  const borrowingPower = 9250.22;
  const borrowingPowerUsed = (totalBorrowed / borrowingPower) * 100;

  const handleAssetActionClick = (
    asset: AssetType,
    mode: "supply" | "borrow"
  ) => {
    setSelectedAssetForDialog(asset);
    setIsDialogSupplyMode(mode === "supply");
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <HeaderStats
          totalSupplied={totalSupplied}
          totalBorrowed={totalBorrowed}
          netAPY={netAPY}
          healthFactor={healthFactor}
        />

        <BorrowingPowerDisplay
          totalBorrowed={totalBorrowed}
          borrowingPower={borrowingPower}
          borrowingPowerUsed={borrowingPowerUsed}
        />

        <Tabs defaultValue="supply" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-zinc-900 border border-zinc-800">
            <TabsTrigger
              value="supply"
              className="data-[state=active]:bg-zinc-800"
            >
              Supply Assets
            </TabsTrigger>
            <TabsTrigger
              value="borrow"
              className="data-[state=active]:bg-zinc-800"
            >
              Borrow Assets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="supply" className="space-y-4">
            <AssetsTable
              title="Assets to Supply"
              icon={<Plus className="h-5 w-5" />}
              assetsList={assets}
              mode="supply"
              onActionClick={(asset) => handleAssetActionClick(asset, "supply")}
            />
            <UserPositionsDisplay
              title="Your Supplies"
              assetsList={assets}
              mode="supply"
              emptyState={{
                icon: <Wallet />,
                text: "No supplies yet",
                subtext: "Supply assets to start earning interest",
              }}
            />
          </TabsContent>

          <TabsContent value="borrow" className="space-y-4">
            <AssetsTable
              title="Assets to Borrow"
              icon={<Minus className="h-5 w-5" />}
              assetsList={assets}
              mode="borrow"
              onActionClick={(asset) => handleAssetActionClick(asset, "borrow")}
            />
            <UserPositionsDisplay
              title="Your Borrows"
              assetsList={assets}
              mode="borrow"
              emptyState={{
                icon: <Zap />,
                text: "No borrows yet",
                subtext: "Supply collateral to start borrowing",
              }}
            />
          </TabsContent>
        </Tabs>

        {selectedAssetForDialog && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span className="text-xl">{selectedAssetForDialog.icon}</span>
                  {isDialogSupplyMode ? "Supply" : "Borrow"}{" "}
                  {selectedAssetForDialog.symbol}
                </DialogTitle>
              </DialogHeader>
              <AssetActionDialogContent
                asset={selectedAssetForDialog}
                isSupplyMode={isDialogSupplyMode}
                healthFactor={healthFactor} // Pass global health factor
                // onAction={(amount, useAsCollateral) => {
                //   console.log(
                //     `${isDialogSupplyMode ? "Supplying" : "Borrowing"} ${amount} ${selectedAssetForDialog.symbol}`,
                //     isDialogSupplyMode && useAsCollateral !== undefined ? `with collateral: ${useAsCollateral}` : ""
                //   );
                //   setIsDialogOpen(false); // Close dialog after action
                // }}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
