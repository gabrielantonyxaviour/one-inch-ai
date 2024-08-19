import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage } from "wagmi";
import {
  arbitrum,
  arbitrumSepolia,
  mainnet,
  polygon,
  polygonAmoy,
  sepolia,
} from "wagmi/chains";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";

if (!projectId) throw new Error("Project ID is not defined");

export const metadata = {
  name: "1Inch AI",
  description: "Easing the transition to web3 whales for the masses",
  url: "https://one-inch-ai.vercel.app/",
  icons: ["https://one-inch-ai.vercel.app/logo.png"],
};

// Create wagmiConfig
const chains = [sepolia, polygonAmoy, arbitrumSepolia] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
