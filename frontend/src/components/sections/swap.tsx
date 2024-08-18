import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import From from "./from";
import To from "./to";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
} from "../ui/menubar";
import { MenubarTrigger } from "@radix-ui/react-menubar";
import Image from "next/image";
import { supportedchains, supportedcoins } from "@/lib/constants";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useAccount, useSwitchChain } from "wagmi";
import Slippage from "./slippage";
import { FusionSDK, NetworkEnum } from "@1inch/fusion-sdk";
import { useEffect } from "react";
import axios from "axios";
interface SwapProps {
  selectedAction: boolean;
  setSelectedAction: (selectedAction: boolean) => void;
  fromChevron: boolean;
  setFromChevron: (fromChevron: boolean) => void;
  toChevron: boolean;
  setToChevron: (toChevron: boolean) => void;
  fromAmount: string;
  setFromAmount: (fromAmount: string) => void;
  fromToken: string;
  setFromToken: (fromToken: string) => void;
  toToken: string;
  setToToken: (toToken: string) => void;
  toAmount: string;
  setToAmount: (toAmount: string) => void;
  slippage: string;
  setSlippage: (slippage: string) => void;
}

export default function Swap({
  selectedAction,
  setSelectedAction,
  fromChevron,
  setFromChevron,
  toChevron,
  setToChevron,
  fromAmount,
  setFromAmount,
  fromToken,
  setFromToken,
  toToken,
  setToToken,
  toAmount,
  setToAmount,
  setSlippage,
  slippage,
}: SwapProps) {
  const { switchChainAsync } = useSwitchChain();
  const { chainId } = useAccount();
  useEffect(() => {
    (async function () {
      console.log("FETCHING ORDERS");
      const response = await axios.post("/api/one-inch/get-quote");
      console.log(response.data);
    })();
  }, [chainId]);
  return (
    <div className="w-[75%] flex flex-col justify-center items-center">
      <Image src="/logo.png" width={100} height={100} alt="" />

      <Card className="border-none w-[500px] ">
        <CardTitle>
          <div className="flex items-center justify-between px-3 py-1">
            <div className="flex ">
              <Button
                variant={"ghost"}
                className={`hover:bg-transparent  ${
                  !selectedAction
                    ? "text-primary"
                    : "text-muted-foreground font-semibold"
                }`}
                onClick={async () => {
                  setSelectedAction(false);
                }}
              >
                Swap
              </Button>
              <Button
                variant={"ghost"}
                className={`hover:bg-transparent  ${
                  selectedAction
                    ? "text-primary"
                    : "text-muted-foreground font-semibold"
                }`}
                onClick={() => setSelectedAction(true)}
              >
                Limit
              </Button>
            </div>
            <Menubar
              onClick={() => {
                setFromChevron(!fromChevron);
              }}
              className="border-none text-sm"
            >
              <MenubarMenu>
                <MenubarTrigger
                  onClick={() => {
                    setFromChevron(!fromChevron);
                  }}
                >
                  <div className="flex space-x-2 items-center ">
                    <Image
                      src={
                        supportedchains[(chainId || 11155111).toString()].image
                      }
                      width={20}
                      height={20}
                      alt=""
                      className="rounded-full"
                    />
                    <p>
                      {supportedchains[(chainId || 11155111).toString()].name}
                    </p>
                    {!fromChevron ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </div>
                </MenubarTrigger>
                <MenubarContent>
                  {Object.values(supportedchains).map((coin) => (
                    <MenubarItem
                      onClick={async () => {
                        await switchChainAsync({
                          chainId: coin.chainId,
                        });
                        setFromChevron(true);
                      }}
                    >
                      <div className="flex space-x-2">
                        <Image
                          src={coin.image}
                          width={20}
                          height={20}
                          alt=""
                          className="rounded-full"
                        />
                        <p>{coin.name}</p>
                      </div>
                    </MenubarItem>
                  ))}
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </CardTitle>
        <CardContent className="">
          <From
            fromChevron={fromChevron}
            setFromChevron={setFromChevron}
            fromAmount={fromAmount}
            setFromAmount={setFromAmount}
            fromToken={fromToken}
            setFromToken={setFromToken}
          />
          <To
            toChevron={toChevron}
            setToChevron={setToChevron}
            toAmount={toAmount}
            setToAmount={setToAmount}
            toToken={toToken}
            setToToken={setToToken}
          />
          <Slippage slippage={slippage} setSlippage={setSlippage} />
          <Button variant={"default"} className="w-full font-bold">
            Swap
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
