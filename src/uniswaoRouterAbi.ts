export const uniswapRouterAbi = [
  {
    type: "constructor",
    inputs: [
      { name: "_original", type: "address", internalType: "address" },
      { name: "_factory", type: "address", internalType: "address" },
      {
        name: "_tokenManager",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  { type: "fallback", stateMutability: "nonpayable" },
  { type: "receive", stateMutability: "payable" },
  {
    type: "function",
    name: "factory",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "original",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "swapTokensForExactTokens",
    inputs: [
      { name: "amountOut", type: "uint256", internalType: "uint256" },
      { name: "amountInMax", type: "uint256", internalType: "uint256" },
      { name: "path", type: "address[]", internalType: "address[]" },
      { name: "to", type: "address", internalType: "address" },
      { name: "deadline", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "amounts", type: "uint256[]", internalType: "uint256[]" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "tokenManager",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract TokenManager",
      },
    ],
    stateMutability: "view",
  },
] as const;
