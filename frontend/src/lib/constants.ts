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
};

export const supportedchains: Record<string, any> = {
  421614: {
    name: "Arbitrum",
    chainId: 421614,
    image: "/coins/arbitrum.png",
  },
  11155111: {
    name: "Ethereum",
    chainId: 11155111,
    image: "/coins/ethereum.png",
  },
  80002: {
    name: "Polygon",
    chainId: 80002,
    image: "/coins/polygon.png",
  },
};
