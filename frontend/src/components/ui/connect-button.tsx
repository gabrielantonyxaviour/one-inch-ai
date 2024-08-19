import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { bscTestnet } from "viem/chains";
import { Button } from "./button";
import { Icons } from "./icons";
import { useWalletInfo, useWeb3Modal } from "@web3modal/wagmi/react";
import Image from "next/image";
import Spinner from "./loading";

export default function ConnectButton() {
  const { address, status, chainId } = useAccount();
  const { open, close } = useWeb3Modal();
  const { walletInfo } = useWalletInfo();
  if (walletInfo == undefined && status != "disconnected")
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  return status == "connected" ? (
    <Button
      variant="outline"
      className="my-auto"
      onClick={() => {
        open();
      }}
    >
      <Image
        src={walletInfo?.icon || ""}
        width={20}
        height={20}
        alt=""
        className="mr-2"
      />
      {address?.slice(0, 6) + "..." + address?.slice(-6)}
    </Button>
  ) : (
    <Button
      variant="outline"
      className="my-auto"
      onClick={() => {
        console.log("connect");
        open();
      }}
    >
      Connect Wallet
    </Button>
  );
}
