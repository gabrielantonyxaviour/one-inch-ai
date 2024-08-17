import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage } from "wagmi";
import { arbitrumSepolia, polygonAmoy, sepolia } from "wagmi/chains";

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";

if (!projectId) throw new Error("Project ID is not defined");

export const metadata = {
  name: "1Inch AI",
  description: "Easing the transition to web3 whales for the masses",
  url: "https://one-inch-ai.vercel.app/",
  icons: ["https://one-inch-ai.vercel.app/logo.png"],
};

// Create wagmiConfig
const chains = [sepolia, arbitrumSepolia, polygonAmoy] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
