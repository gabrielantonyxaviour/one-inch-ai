import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { supportedcoins } from "@/lib/constants";
import { fromRlp } from "viem";
import Image from "next/image";
import { roundUpToFiveDecimals } from "@/lib/utils";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

export default function Transaction({
  open,
  action,
  fromToken,
  toToken,
  fromAmount,
  toAmount,
}: {
  open: boolean;
  action: string;
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
}) {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Confirm {action == "swap" ? "Swap" : "Order"}
          </DialogTitle>
          <DialogDescription>
            <p>Check the summary of the transaction</p>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-around w-full text-center items-center text-sm">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <p>From</p>
            <Image
              src={supportedcoins[fromToken].image}
              width={50}
              height={50}
              alt="coin"
              className="mx-auto"
            />
            <p>
              {roundUpToFiveDecimals(fromAmount)}{" "}
              {supportedcoins[fromToken].symbol}
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <ArrowBigRight size={30} />
            <ArrowBigLeft size={30} />
          </div>
          <div className="flex flex-col space-y-3">
            <p>To</p>
            <Image
              src={supportedcoins[toToken].image}
              width={50}
              height={50}
              alt="coin"
              className="mx-auto"
            />
            <p>
              {roundUpToFiveDecimals(toAmount)} {supportedcoins[toToken].symbol}
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => {}}>
            {action == "swap" ? "Perform Swap" : "Create Order"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
