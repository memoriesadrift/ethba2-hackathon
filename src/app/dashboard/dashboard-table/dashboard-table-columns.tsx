import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { AssetCell } from "@/components/table/asset-cell";
import { Token } from "@/mocks/tokens";
import { BalanceCell } from "./balance-cell";

export const useDashboardTableColumns = () => {
  const columnHelper = createColumnHelper<Token>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Token",
      }),
      columnHelper.accessor("address", {
        header: "Address",
      }),
      columnHelper.display({
        id: "balance",
        header: "Balance",
        cell: ({ row }) => <BalanceCell id={row.original.id} />,
      }),
    ],
    [columnHelper]
  );

  return columns;
};
