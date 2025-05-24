"use client";

import { CryptoIcon } from "@ledgerhq/crypto-icons";
import React, { useState, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import {
  TrendingUp,
  Wallet,
  Plus,
  Info,
  Shield,
  DollarSign,
} from "lucide-react";
import { useFakeBalance } from "@/lib/hooks/use-balance";
import {
  useWriteAaveV3PoolCloneSupply,
  useWriteAaveV3PoolCloneWithdraw,
} from "@/abi";
import { parseEther } from "viem";

interface AssetType {
  symbol: string;
  name: string;
  icon: React.ReactNode;
  supplyAPY: number;
  totalSupplied: string;
  liquidity: string;
  walletBalance: string;
  supplied: string;
  canBeCollateral: boolean;
  id: bigint;
}

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
  netAPY: number;
  healthFactor: number; // Health factor might still be relevant for overall account health if collateral is supplied
}

const HeaderStats: React.FC<HeaderStatsProps> = ({
  totalSupplied,
  netAPY,
  healthFactor,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {" "}
    <HeaderStatCard
      title="Total Supplied"
      value={`$${totalSupplied.toLocaleString()}`}
      icon={<TrendingUp />}
      iconBgClass="bg-green-500/10"
      iconClass="text-green-500"
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

// Asset Action Dialog Content
interface AssetActionDialogContentProps {
  asset: AssetType;
  actionType: "supply" | "withdraw"; // Explicitly define action type
}

const AssetActionDialogContent: React.FC<AssetActionDialogContentProps> = ({
  asset,
  actionType,
}) => {
  const { data: balance, isLoading } = useFakeBalance(asset.id);
  const [amount, setAmount] = useState("");
  const [useAsCollateral, setUseAsCollateral] = useState(asset.canBeCollateral);
  const { writeContract: supply } = useWriteAaveV3PoolCloneSupply();
  const { writeContract: withdraw } = useWriteAaveV3PoolCloneWithdraw();

  const onAction = (amount: string, _isCollateral?: boolean) => {
    if (actionType === "supply") {
      supply({
        args: [asset.id, parseEther(amount)],
      });
    } else {
      withdraw({
        args: [asset.id, parseEther(amount)],
      });
    }
  };
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Amount</Label>
        <div className="relative">
          <Input
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
                actionType === "supply" ? asset.walletBalance : asset.supplied
              )
            }
          >
            MAX
          </Button>
        </div>
        <p className="text-sm text-zinc-400">
          {actionType === "supply" ? "Wallet Balance" : "Currently Supplied"}:{" "}
          {actionType === "supply" ? asset.walletBalance : asset.supplied}{" "}
          {asset.symbol}
        </p>
      </div>

      {actionType === "supply" && asset.canBeCollateral && (
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
            {actionType === "supply" ? "Supply APY" : "Withdrawal Info"}
          </span>
          <span
            className={
              actionType === "supply" ? "text-green-500" : "text-zinc-300"
            }
          >
            {actionType === "supply"
              ? `${asset.supplyAPY}%`
              : "Review details below"}
          </span>
        </div>
        {actionType === "supply" ? (
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Collateral Usage</span>
            <span>
              {asset.canBeCollateral && useAsCollateral
                ? "Enabled"
                : "Disabled"}
            </span>
          </div>
        ) : (
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Asset to Withdraw</span>
            <span>{asset.symbol}</span>
          </div>
        )}
      </div>

      <Button
        className={`w-full ${
          actionType === "supply"
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-orange-600 hover:bg-orange-700"
        }`}
        onClick={() =>
          onAction(
            amount,
            actionType === "supply" ? useAsCollateral : undefined
          )
        }
      >
        {actionType === "supply" ? "Supply" : "Withdraw"} {asset.symbol}
      </Button>
    </div>
  );
};

// Assets Table (for Supply or Borrow)
interface AssetsTableProps {
  title: string;
  icon: ReactNode;
  assetsList: AssetType[];
  onActionClick: (asset: AssetType) => void;
}

const AssetsTable: React.FC<AssetsTableProps> = ({
  title,
  icon,
  assetsList,
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
                Wallet Balance{" "}
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">
                APY
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">
                Can be Collateral{" "}
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
                  <p className="font-medium">{asset.walletBalance}</p>
                  <p className="text-sm text-zinc-400">{asset.symbol}</p>
                </td>
                <td className="py-4 px-4">
                  <p className={`font-medium text-green-500`}>
                    {asset.supplyAPY}%
                  </p>
                </td>
                <td className="py-4 px-4">
                  {asset.canBeCollateral ? (
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
                  )}
                </td>
                <td className="py-4 px-4 text-right">
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                    variant="default"
                    onClick={() => onActionClick(asset)}
                  >
                    Supply
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
  emptyState: {
    icon: ReactNode;
    text: string;
    subtext: string;
  };
  onWithdrawClick: (asset: AssetType) => void; // Added for withdraw action
}

const UserPositionsDisplay: React.FC<UserPositionsDisplayProps> = ({
  title,
  assetsList,
  emptyState,
  onWithdrawClick,
}) => {
  const relevantAssets = assetsList.filter(
    (asset) => Number.parseFloat(asset.supplied) > 0
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
                      {asset.supplied} supplied
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium text-green-500`}>
                    {asset.supplyAPY}% APY
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-2 border-zinc-700"
                    onClick={() => onWithdrawClick(asset)}
                  >
                    Withdraw
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

const assetsList = [
  {
    id: 1n,
    symbol: "ETH",
    name: "Ethereum",
    icon: <CryptoIcon ledgerId="ethereum" ticker="ETH" size="24px" />,
    canBeCollateral: true,
  },
  {
    id: 0n,
    symbol: "USDC",
    name: "USD Coin",
    icon: (
      <CryptoIcon ledgerId="base/erc20/usd_coin" ticker="USDC" size="24px" />
    ),
    canBeCollateral: true,
  },
  {
    id: 3n,
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    icon: (
      <CryptoIcon
        ledgerId="ethereum/erc20/wrapped_bitcoin"
        ticker="WBTC"
        size="24px"
      />
    ),
    canBeCollateral: true,
  },
];

const useGetAssetsData = (assets: Partial<AssetType>[]) => {
  return assets.map((asset) => ({
    ...asset,
    supplyAPY: 2.45,
    totalSupplied: "12.5M",
    liquidity: "4.3M",
    walletBalance: "2.5",
    supplied: "0",
  })) as AssetType[];
};

export default function AaveClone() {
  const [selectedAssetForDialog, setSelectedAssetForDialog] =
    useState<AssetType | null>(null);
  const [dialogActionType, setDialogActionType] = useState<
    "supply" | "withdraw"
  >("supply");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const totalSupplied = 12450.67;
  const netAPY = 2.34;
  const healthFactor = 2.85;

  const handleSupplyAssetClick = (asset: AssetType) => {
    setSelectedAssetForDialog(asset);
    setDialogActionType("supply");
    setIsDialogOpen(true);
  };

  const handleWithdrawAssetClick = (asset: AssetType) => {
    setSelectedAssetForDialog(asset);
    setDialogActionType("withdraw");
    setIsDialogOpen(true);
  };

  const assets = useGetAssetsData(assetsList);

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Decentralized Liquidity Protocol
          </h1>
          <p className="mt-3 text-lg text-zinc-400">
            Supply and borrow digital assets, earn interest, and build on a
            permissionless financial network.
          </p>
        </div>

        <HeaderStats
          totalSupplied={totalSupplied}
          netAPY={netAPY}
          healthFactor={healthFactor}
        />

        <div className="space-y-4">
          <AssetsTable
            title="Assets to Supply"
            icon={<Plus className="h-5 w-5" />}
            assetsList={assets}
            onActionClick={handleSupplyAssetClick}
          />
          <UserPositionsDisplay
            title="Your Supplies"
            assetsList={assets}
            emptyState={{
              icon: <Wallet />,
              text: "No supplies yet",
              subtext: "Supply assets to start earning interest",
            }}
            onWithdrawClick={handleWithdrawAssetClick}
          />
        </div>

        {selectedAssetForDialog && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span className="text-xl">{selectedAssetForDialog.icon}</span>
                  {dialogActionType === "supply" ? "Supply" : "Withdraw"}{" "}
                  {selectedAssetForDialog.symbol}
                </DialogTitle>
              </DialogHeader>
              <AssetActionDialogContent
                asset={selectedAssetForDialog}
                actionType={dialogActionType}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
