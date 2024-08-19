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
  },
  421612: {
    name: "Arbitrum",
    chainId: 421614,
    image: "/coins/arbitrum.png",
    symbol: "ETH",
  },
  11155111: {
    name: "Ethereum",
    chainId: 11155111,
    symbol: "ETH",
    image: "/coins/ethereum.png",
  },
  1: {
    name: "Ethereum",
    chainId: 11155111,
    symbol: "ETH",
    image: "/coins/ethereum.png",
  },
  80002: {
    name: "Polygon",
    chainId: 80002,
    symbol: "MATIC",
    image: "/coins/polygon.png",
  },
  137: {
    name: "Polygon",
    chainId: 80002,
    symbol: "MATIC",
    image: "/coins/polygon.png",
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
