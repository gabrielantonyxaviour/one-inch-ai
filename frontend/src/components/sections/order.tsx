import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import From from "./from";
import To from "./to";
import { useAccount } from "wagmi";
import Spinner from "../ui/loading";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
interface OrderProps {
  fromAmount: string;
  setFromAmount: (fromAmount: string) => void;
  fromToken: string;
  setFromToken: (fromToken: string) => void;
  toToken: string;
  setToToken: (toToken: string) => void;
  toAmount: string;
  setToAmount: (toAmount: string) => void;
  sellingPrice: string;
  setSellingPrice: (sellingPrice: string) => void;
}

export default function Order({
  fromAmount,
  setFromAmount,
  fromToken,
  setFromToken,
  toToken,
  setToToken,
  toAmount,
  setToAmount,
  setSellingPrice,
  sellingPrice,
}: OrderProps) {
  const { chainId } = useAccount();
  if (chainId == undefined)
    return (
      <div className="w-[75%] flex flex-col justify-center items-center">
        <Spinner />
      </div>
    );
  return (
    <Card className="border-none w-[500px] ">
      <CardContent className="">
        <From
          fromAmount={fromAmount}
          setFromAmount={setFromAmount}
          fromToken={fromToken}
          setFromToken={setFromToken}
        />
        <To
          toAmount={toAmount}
          setToAmount={setToAmount}
          toToken={toToken}
          setToToken={setToToken}
        />
        <div className="flex justify-between items-center my-4">
          <p>Pay {fromToken.toUpperCase()} at price</p>
          <Input
            className="font-semibold border-none w-[50%] text-right hover:border-none"
            value={sellingPrice}
            onChange={(e) => {
              setSellingPrice(e.target.value);
            }}
          />
          USD
        </div>

        <Button variant={"default"} className="w-full font-bold">
          Create Limit Order
        </Button>
      </CardContent>
    </Card>
  );
}
