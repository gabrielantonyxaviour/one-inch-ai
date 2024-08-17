export type Address = `0x${string}`;

export type Action = {
  txId: string;
  actionId: string;
  timeStamp: string;
};
export type Position = {
  id: string;
  token0: string;
  token1: string;
  depositedToken0: string;
  depositedToken1: string;
  collectedFeesToken0: string;
  collectedFeesToken1: string;
  feeTier: string;
  minThreshold: string;
  maxThreshold: string;
  status: "In range" | "Closed" | "Out of range";
};

export type TokenDetailed = {
  derivedETH: string;
  feesUSD: string;
  name: string;
  symbol: string;
  totalValueLocked: string;
  totalValueLockedUSD: string;
  totalValueLockedUSDUntracked: string;
};

export type Pool = {
  feeTier: string;
};

export type Tick = {
  collectedFeesToken0: string;
  collectedFeesToken1: string;
  collectedFeesUSD: string;
  createdAtBlockNumber: string;
  createdAtTimestamp: string;
  feeGrowthOutside0X128: string;
  feeGrowthOutside1X128: string;
  feesUSD: string;
  id: string;
  liquidityGross: string;
  liquidityNet: string;
  liquidityProviderCount: string;
  poolAddress: string;
  price0: string;
  price1: string;
  tickIdx: string;
  untrackedVolumeUSD: string;
  volumeToken0: string;
  volumeToken1: string;
  volumeUSD: string;
};

export type PositionDetailed = {
  collectedFeesToken0: string;
  collectedFeesToken1: string;
  collectedToken0: string;
  collectedToken1: string;
  depositedToken0: string;
  depositedToken1: string;
  feeGrowthInside0LastX128: string;
  feeGrowthInside1LastX128: string;
  id: string;
  liquidity: string;
  owner: string;
  pool: Pool;
  tickLower: Tick;
  tickUpper: Tick;
  token0: TokenDetailed;
  token1: TokenDetailed;
  transaction: {
    id: string;
  };
};
