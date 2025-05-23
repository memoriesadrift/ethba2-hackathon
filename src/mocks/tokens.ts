export interface Token {
  id: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  balance: number;
  price: number;
}

export const tokens: Token[] = [
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
    logoURI: "/placeholder.svg?height=32&width=32",
    balance: 1.234,
    price: 3500,
  },
  {
    id: "usd-coin",
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    logoURI: "/placeholder.svg?height=32&width=32",
    balance: 2500.75,
    price: 1,
  },
  {
    id: "wrapped-bitcoin",
    name: "Wrapped Bitcoin",
    symbol: "WBTC",
    decimals: 8,
    logoURI: "/placeholder.svg?height=32&width=32",
    balance: 0.056,
    price: 65000,
  },
  {
    id: "dai",
    name: "Dai Stablecoin",
    symbol: "DAI",
    decimals: 18,
    logoURI: "/placeholder.svg?height=32&width=32",
    balance: 1250.5,
    price: 1,
  },
  {
    id: "chainlink",
    name: "Chainlink",
    symbol: "LINK",
    decimals: 18,
    logoURI: "/placeholder.svg?height=32&width=32",
    balance: 75.25,
    price: 15.5,
  },
  {
    id: "uniswap",
    name: "Uniswap",
    symbol: "UNI",
    decimals: 18,
    logoURI: "/placeholder.svg?height=32&width=32",
    balance: 120.75,
    price: 8.2,
  },
  {
    id: "aave",
    name: "Aave",
    symbol: "AAVE",
    decimals: 18,
    logoURI: "/placeholder.svg?height=32&width=32",
    balance: 5.5,
    price: 95,
  },
  {
    id: "compound",
    name: "Compound",
    symbol: "COMP",
    decimals: 18,
    logoURI: "/placeholder.svg?height=32&width=32",
    balance: 12.25,
    price: 45,
  },
];
