import { Address } from "viem";

import t from "../../contracts/addresses/base/original/tokens.json";

export interface Token {
  id: string;
  name: string;
  address: Address;
}

export const tokens = Object.entries(t).map(([name, address]) => ({
  address: address as Address,
  name,
  id:
    name === "dino" ? "2" : name === "eth" ? "1" : name === "usdc" ? "0" : "3",
})) as Token[];
