import { bscTestnet } from "viem/chains";
import { http, createConfig } from "wagmi";
export const config = createConfig({
  chains: [bscTestnet],
  transports: {
    [bscTestnet.id]: http(),
  },
});
