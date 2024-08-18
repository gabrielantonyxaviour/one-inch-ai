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
    image: "/coins/weth.png",
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
  42161: {
    name: "Arbitrum",
    chainId: 42161,
    image: "/coins/arbitrum.png",
    symbol: "ETH",
  },
  1: {
    name: "Ethereum",
    chainId: 1,
    symbol: "ETH",
    image: "/coins/ethereum.png",
  },
  137: {
    name: "Polygon",
    chainId: 137,
    symbol: "MATIC",
    image: "/coins/polygon.png",
  },
};
