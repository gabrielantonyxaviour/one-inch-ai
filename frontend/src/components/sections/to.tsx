import { ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { supportedchains, supportedcoins } from "@/lib/constants";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Image from "next/image";
import { useAccount } from "wagmi";
import { useState } from "react";
import Spinner from "../ui/loading";
export default function To({
  toAmount,
  toToken,
  setToToken,
  toLoading,
}: {
  toAmount: string;
  toToken: string;
  setToToken: (toToken: string) => void;
  toLoading: boolean;
}) {
  const { chainId } = useAccount();
  const [toChevron, setToChevron] = useState(false);
  return (
    <Card className="w-full border-white bg-zinc-950">
      <CardTitle>
        <p className="text-xs text-muted-foreground font-semibold p-2">
          You receive
        </p>
      </CardTitle>
      <CardContent className="flex justify-between p-0">
        <Menubar
          onClick={() => {
            setToChevron(!toChevron);
          }}
          className="border-none"
        >
          <MenubarMenu>
            <MenubarTrigger
              onClick={() => {
                setToChevron(!toChevron);
              }}
            >
              <div className="flex space-x-2 items-center ">
                <Image
                  src={supportedcoins[toToken].image}
                  width={20}
                  height={20}
                  alt=""
                  className="rounded-full"
                />
                <p>{supportedcoins[toToken].symbol}</p>
                {!toChevron ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </div>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem
                onClick={() => {
                  setToToken(
                    supportedchains[
                      (chainId || 11155111).toString()
                    ].symbol.toLowerCase()
                  );
                  setToChevron(true);
                }}
              >
                <div className="flex space-x-2">
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
                    {supportedchains[(chainId || 11155111).toString()].symbol}
                  </p>
                </div>
              </MenubarItem>
              {Object.values(supportedcoins)
                .slice(0, -2)
                .map((coin) => (
                  <MenubarItem
                    onClick={() => {
                      setToToken(coin.symbol.toLowerCase());
                      setToChevron(true);
                    }}
                  >
                    <div className="flex space-x-2">
                      <Image
                        src={`/coins/${coin.symbol.toLowerCase()}.png`}
                        width={20}
                        height={20}
                        alt=""
                        className="rounded-full"
                      />
                      <p>{coin.symbol}</p>
                    </div>
                  </MenubarItem>
                ))}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        {toLoading ? (
          <div className="pr-4">
            <Spinner />
          </div>
        ) : (
          <Input
            className="font-semibold border-none w-[50%] text-right hover:border-none"
            disabled
            value={toAmount}
          />
        )}
      </CardContent>
      <CardFooter className="px-2 pb-2">
        <p className="text-xs text-muted-foreground">
          {supportedcoins[toToken].name}
        </p>
      </CardFooter>
    </Card>
  );
}
