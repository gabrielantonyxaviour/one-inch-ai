import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { bscTestnet } from "viem/chains";
import { Button } from "./button";
import { Icons } from "./icons";

export default function ConnectButton() {
  const { address, status, chainId } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  return status == "connected" ? (
    <Button
      variant="outline"
      className="my-auto "
      onClick={() => {
        disconnect();
      }}
    >
      <Icons.binance className="h-6 w-6 fill-current mr-2" />
      {address?.slice(0, 6) + "..." + address?.slice(-6)}
    </Button>
  ) : (
    <Button
      variant="outline"
      className="my-auto"
      onClick={() => {
        console.log("connect");
        connect({
          chainId: bscTestnet.id,
          connector: injected(),
        });
      }}
    >
      Connect Wallet
    </Button>
  );
}
