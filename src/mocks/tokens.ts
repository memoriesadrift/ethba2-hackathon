import { Address } from "viem";

import t from "../../contracts/addresses/base/original/tokens.json";

export interface Token {
  name: string;
  address: Address;
}

export const tokens = Object.entries(t).map(([name, address]) => ({
  address: address as Address,
  name,
}));
