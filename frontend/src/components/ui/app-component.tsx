import Image from "next/image";
import { Card, CardTitle } from "./card";
import { Button } from "./button";
import { Menubar, MenubarTrigger } from "./menubar";
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
} from "@radix-ui/react-menubar";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { supportedchains } from "@/lib/constants";
import { useAccount, useSwitchChain } from "wagmi";
import Swap from "../sections/swap";
import Order from "../sections/order";
import Spinner from "./loading";
interface AppComponentProps {
  selectedAction: boolean;
  setSelectedAction: (selectedAction: boolean) => void;
  fromAmount: string;
  setFromAmount: (fromAmount: string) => void;
  fromToken: string;
  setFromToken: (fromToken: string) => void;
  toToken: string;
  setToToken: (toToken: string) => void;
  toAmount: string;
  slippage: string;
  setSlippage: (slippage: string) => void;
  sellingPrice: string;
  setSellingPrice: (sellingPrice: string) => void;
  toLoading: boolean;
  sellingPriceLoading: boolean;
  triggerAction: () => void;
}
export default function AppComponent({
  selectedAction,
  setSelectedAction,
  fromAmount,
  setFromAmount,
  setToToken,
  fromToken,
  setFromToken,
  toToken,
  toAmount,
  slippage,
  setSlippage,
  sellingPrice,
  setSellingPrice,
  toLoading,
  sellingPriceLoading,
  triggerAction,
}: AppComponentProps) {
  const [chevron, setChevron] = useState(false);
  const { chainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  if (chainId == undefined)
    return (
      <div className="w-[75%] flex flex-col justify-center items-center">
        <Spinner />
      </div>
    );

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
                setChevron(!chevron);
              }}
              className="border-none text-sm"
            >
              <MenubarMenu>
                <MenubarTrigger
                  onClick={() => {
                    setChevron(!chevron);
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
                    {!chevron ? (
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
                        setChevron(true);
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
        {selectedAction ? (
          <Order
            {...{
              fromAmount,
              setFromAmount,
              fromToken,
              setFromToken,
              toToken,
              setToToken,
              toAmount,
              sellingPrice,
              setSellingPrice,
              sellingPriceLoading,
              triggerAction,
            }}
          />
        ) : (
          <Swap
            {...{
              fromAmount,
              setFromAmount,
              fromToken,
              setFromToken,
              toToken,
              setToToken,
              toAmount,
              setSlippage,
              slippage,
              toLoading,
              triggerAction,
            }}
          />
        )}
      </Card>
    </div>
  );
}
