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
export default function From({
  fromAmount,
  setFromAmount,
  fromToken,
  setFromToken,
}: {
  fromAmount: string;
  setFromAmount: (fromAmount: string) => void;
  fromToken: string;
  setFromToken: (fromToken: string) => void;
}) {
  const { chainId } = useAccount();
  const [chevron, setChevron] = useState(false);
  return (
    <Card className="w-full  border-none bg-zinc-950">
      <CardTitle>
        <p className="text-xs text-muted-foreground font-semibold p-2">
          You pay
        </p>
      </CardTitle>
      <CardContent className="flex justify-between p-0">
        <Menubar
          onClick={() => {
            setChevron(!chevron);
          }}
          className="border-none"
        >
          <MenubarMenu>
            <MenubarTrigger
              onClick={() => {
                setChevron(!chevron);
              }}
            >
              <div className="flex space-x-2 items-center ">
                <Image
                  src={supportedcoins[fromToken].image}
                  width={20}
                  height={20}
                  alt=""
                  className="rounded-full"
                />
                <p>{supportedcoins[fromToken].symbol}</p>
                {!chevron ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem
                onClick={() => {
                  setFromToken(
                    supportedchains[
                      (chainId || 11155111).toString()
                    ].symbol.toLowerCase()
                  );
                  setChevron(true);
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
                      setFromToken(coin.symbol.toLowerCase());
                      setChevron(true);
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
        <Input
          className="font-semibold border-none w-[50%] text-right hover:border-none"
          value={fromAmount}
          onChange={(e) => {
            const decimalRegex = /^\d+(\.\d*)?$/;
            if (decimalRegex.test(e.target.value) || e.target.value == "")
              setFromAmount(e.target.value);
          }}
        />
      </CardContent>

      <CardFooter className="px-2">
        <p className="text-xs text-muted-foreground">
          {supportedcoins[fromToken].name}
        </p>
      </CardFooter>
    </Card>
  );
}
