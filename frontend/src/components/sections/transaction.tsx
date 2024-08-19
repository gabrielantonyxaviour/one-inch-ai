import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { ONE_INCH_ABI, supportedchains, supportedcoins } from "@/lib/constants";
import Image from "next/image";
import { roundUpToFiveDecimals } from "@/lib/utils";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useEffect, useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useAccount, useWriteContract } from "wagmi";
import { erc20Abi } from "viem";
export default function Transaction({
  open,
  setOpen,
  action,
  fromToken,
  toToken,
  fromAmount,
  toAmount,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  action: string;
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
}) {
  const [completedTxs, setCompletedTxs] = useState(0);
  const [approveTx, setApproveTx] = useState("");
  const [actionTx, setActionTx] = useState("");
  const { toast } = useToast();
  const { chainId, address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  useEffect(() => {
    if (approveTx != "") {
      toast({
        title: "Approve Tokens Confirmed",
        description: "Transaction Sent Successfully",
        action: (
          <ToastAction altText="Goto schedule to undo">
            <Link
              target="_blank"
              href={
                supportedchains[(chainId || 11155111).toString()].explorer +
                "tx/" +
                approveTx
              }
            >
              View
            </Link>
          </ToastAction>
        ),
      });
    }
  }, [approveTx]);

  useEffect(() => {
    if (actionTx != "") {
      toast({
        title: `${action == "swap" ? "Swap" : "Order"} Confirmed`,
        description: "Transaction Sent Successfully",
        action: (
          <ToastAction altText="Goto schedule to undo">
            <Link
              target="_blank"
              href={
                supportedchains[(chainId || 11155111).toString()].explorer +
                "tx/" +
                actionTx
              }
            >
              View
            </Link>
          </ToastAction>
        ),
      });
    }
  }, [actionTx]);
  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
      }}
    >
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
          {fromToken != "eth" && fromToken != "matic" && (
            <Button
              disabled={completedTxs > 0}
              onClick={async () => {
                const tx = await writeContractAsync({
                  abi: erc20Abi,
                  address:
                    supportedchains[(chainId || 11155111).toString()].approve,
                  functionName: "approve",
                  args: [
                    supportedchains[(chainId || 11155111).toString()].address,
                    BigInt(fromAmount),
                  ],
                });
                setApproveTx(tx);
                setCompletedTxs(completedTxs + 1);
              }}
            >
              Approve {supportedcoins[fromToken].symbol}
            </Button>
          )}
          <Button
            disabled={
              completedTxs == 0 && fromToken != "eth" && fromToken != "matic"
            }
            onClick={async () => {
              if (action == "swap") {
                const tx = await writeContractAsync({
                  abi: ONE_INCH_ABI,
                  address:
                    supportedchains[(chainId || 11155111).toString()].address,
                  functionName: "swap",
                  args: [
                    supportedchains[(chainId || 11155111).toString()].approve,
                    supportedchains[(chainId || 11155111).toString()].approve,
                    BigInt(fromAmount),
                  ],
                });
                setActionTx(tx);
              } else {
                const tx = await writeContractAsync({
                  abi: ONE_INCH_ABI,
                  address:
                    supportedchains[(chainId || 11155111).toString()].address,
                  functionName: "createOrder",
                  args: [
                    supportedchains[(chainId || 11155111).toString()].approve,
                    supportedchains[(chainId || 11155111).toString()].approve,
                    BigInt(fromAmount),
                  ],
                });
                setActionTx(tx);
              }

              setCompletedTxs(completedTxs + 1);
            }}
          >
            {action == "swap" ? "Perform Swap" : "Create Order"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
