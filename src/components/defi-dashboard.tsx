import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExternalLink, Info, MoreHorizontal, Minus } from "lucide-react";

export default function Component() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Your supplies section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-semibold text-muted-foreground">
            Your supplies
          </CardTitle>
          <Button variant="ghost" className="text-muted-foreground">
            Hide <Minus className="ml-2 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Balance</div>
              <div className="text-lg font-medium">$ 2.57</div>
            </div>
            <div className="space-y-1 flex items-center gap-2">
              <div>
                <div className="text-sm text-muted-foreground">APY</div>
                <div className="text-lg font-medium">2.06 %</div>
              </div>
              <Info className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="space-y-1 flex items-center gap-2">
              <div>
                <div className="text-sm text-muted-foreground">Collateral</div>
                <div className="text-lg font-medium">$ 2.57</div>
              </div>
              <Info className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* Supplies table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-muted-foreground">Asset</TableHead>
                <TableHead className="text-muted-foreground">Balance</TableHead>
                <TableHead className="text-muted-foreground">APY</TableHead>
                <TableHead className="text-muted-foreground flex items-center gap-1">
                  Collateral <Info className="h-4 w-4" />
                </TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-foreground rounded-sm flex items-center justify-center">
                      <div className="w-3 h-3 bg-background rounded-full"></div>
                    </div>
                  </div>
                  <span className="font-medium">ETH</span>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">0.0010000</div>
                    <div className="text-sm text-muted-foreground">$ 2.57</div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-medium">2.06 %</span>
                </TableCell>
                <TableCell>
                  <Switch
                    defaultChecked
                    className="data-[state=checked]:bg-green-500"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm">
                      Switch
                    </Button>
                    <Button variant="outline" size="sm">
                      Withdraw
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Assets to supply section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-semibold text-muted-foreground">
            Assets to supply
          </CardTitle>
          <Button variant="ghost" className="text-muted-foreground">
            Hide <Minus className="ml-2 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="show-zero-balance" />
              <label
                htmlFor="show-zero-balance"
                className="text-sm text-muted-foreground"
              >
                Show assets with 0 balance
              </label>
            </div>
            <Button
              variant="ghost"
              className="text-blue-600 hover:text-blue-700"
            >
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center mr-2">
                B
              </div>
              BASE BRIDGE
              <ExternalLink className="ml-1 h-4 w-4" />
            </Button>
          </div>

          {/* Assets table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-muted-foreground">Assets</TableHead>
                <TableHead className="text-muted-foreground">
                  Wallet balance
                </TableHead>
                <TableHead className="text-muted-foreground">APY</TableHead>
                <TableHead className="text-muted-foreground">
                  Can be collateral
                </TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-foreground rounded-sm flex items-center justify-center">
                      <div className="w-3 h-3 bg-background rounded-full"></div>
                    </div>
                  </div>
                  <span className="font-medium">ETH</span>
                </TableCell>
                <TableCell>
                  <span className="font-medium">0.0035966</span>
                </TableCell>
                <TableCell>
                  <span className="font-medium">2.06 %</span>
                </TableCell>
                <TableCell>
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                    <div className="w-3 h-3 text-white text-xs">✓</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm">
                      Supply
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
