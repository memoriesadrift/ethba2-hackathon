import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { DataTableRow } from "./dashboard";
import { AssetCell } from "@/components/table/asset-cell";

export const useDashboardTableColumns = () => {
  const columnHelper = createColumnHelper<DataTableRow>();

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "token",
        header: "Token",
        cell: ({ row }) => (
          <AssetCell
            text={row.original.symbol}
            imageUrl={row.original.tokenImageUrl}
          />
        ),
      }),
      columnHelper.accessor("tokenAddress", {
        header: "Address",
      }),
      columnHelper.accessor("amount", {
        header: "Balance",
      }),
    ],
    [columnHelper]
  );

  return columns;
};
