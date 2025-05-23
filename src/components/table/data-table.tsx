import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "../ui/skeleton"

interface DataTableRow {
  id: string
}

type Props<TData extends DataTableRow> = {
  data?: TData[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[]
  isLoading?: boolean
  isError?: boolean
  onRowClick?: (rowData: TData) => void
  numberOfLoadingRows?: number
  showHeader?: boolean
}

export function DataTable<TData extends DataTableRow>({
  data = [],
  columns,
  isLoading = false,
  isError = false,
  onRowClick,
  numberOfLoadingRows = 5,
  showHeader = true,
}: Props<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const TableSkeleton = () => (
    <>
      {Array.from({ length: numberOfLoadingRows }).map((_, rowIndex) => (
        <TableRow key={`skeleton-row-${rowIndex}`}>
          {table.getAllColumns().map((column) => (
            <TableCell key={`skeleton-row-${rowIndex}-column-${column.id}`}>
              <Skeleton className="w-full h-6 bg-discover-card rounded-md" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )

  if (isError) return <div>Error occurred</div>

  return (
    <Table>
      {showHeader && (
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
      )}
      <TableBody>
        {isLoading ? (
          <TableSkeleton />
        ) : (
          table.getRowModel().rows.map((row) => {
            return (
              <TableRow
                key={row.id}
                data-row-token-id={row.original.id}
                onClick={() => {
                  if (!onRowClick) return
                  onRowClick(row.original)
                }}
                className={onRowClick ? "cursor-pointer" : ""}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            )
          })
        )}
      </TableBody>
    </Table>
  )
}
