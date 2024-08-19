export const supportedcoins: Record<string, any> = {
  weth: {
    name: "Wrapped Ether",
    symbol: "WETH",
    image: "/coins/weth.png",
    token: {
      421614: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      11155111: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    },
  },
  link: {
    name: "Chain Link",
    symbol: "LINK",
    image: "/coins/link.png",
    token: {
      421614: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      11155111: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    },
  },
  usdc: {
    name: "USD Stablecoin",
    symbol: "USDC",
    image: "/coins/usdc.png",
    token: {
      421614: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      11155111: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    },
  },
  usdt: {
    name: "Tether USD",
    symbol: "USDT",
    image: "/coins/usdt.png",
    token: {
      421614: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      11155111: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    },
  },
  dai: {
    name: "Dai Stablecoin",
    symbol: "DAI",
    image: "/coins/dai.png",
    token: {
      421614: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      11155111: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    },
  },
  eth: {
    name: "Ethereum",
    symbol: "ETH",
    image: "/coins/ethereum.png",
  },
  matic: {
    name: "Polygon",
    symbol: "MATIC",
    image: "/coins/polygon.png",
  },
};

export const supportedchains: Record<string, any> = {
  421614: {
    name: "Arbitrum",
    chainId: 421614,
    image: "/coins/arbitrum.png",
    symbol: "ETH",
    explorer: "https://sepolia-explorer.arbitrum.io/",
    address: "0xCE1B9ABB7dE3ba02964C448d6C6386c4469034FE",
    approve: "0xa12Ffa8429b6c0e4AcFD93aFbd30705bBE254FD5",
  },
  11155111: {
    name: "Ethereum",
    chainId: 11155111,
    symbol: "ETH",
    image: "/coins/ethereum.png",
    explorer: "https://eth-sepolia.blockscout.com/",
    address: "0x9425ab731bdF86c6E02Cad8Ba4AF0005BE0014d0",
    approve: "",
  },
  80002: {
    name: "Polygon",
    chainId: 80002,
    symbol: "MATIC",
    image: "/coins/polygon.png",
    explorer: "https://www.oklink.com/amoy/",
    address: "0x7125e097a72cCf547ED6e9e98bCc09BE3AC61997",
    approve: "0x50751BD8d7b0a84c422DE96A56426a370F31a42D",
  },
};

export const COINMARKETCAP_IDS: Record<string, number> = {
  weth: 2396,
  link: 1975,
  usdc: 3408,
  usdt: 825,
  dai: 4943,
  eth: 1027,
  matic: 3890,
};

export const ONE_INCH_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "fromToken",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "toToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "OrderCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "fromToken",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "toToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Swapped",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_fromToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_toToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "createOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_fromToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_toToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "swap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
