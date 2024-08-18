"use client";

import AIComponent from "@/components/sections/ai";
import Swap from "@/components/sections/swap";

import ConnectButton from "@/components/ui/connect-button";
import Image from "next/image";
import { useState } from "react";
import { useAccount, useBalance } from "wagmi";

export default function Page() {
  const { status, address } = useAccount();
  const [selectedAction, setSelectedAction] = useState(false);
  const [fromChevron, setFromChevron] = useState(false);
  const [toChevron, setToChevron] = useState(false);
  const [fromAmount, setFromAmount] = useState("0");
  const [fromToken, setFromToken] = useState("usdt");
  const [toToken, setToToken] = useState("link");
  const [toAmount, setToAmount] = useState("0");
  const [slippage, setSlippage] = useState("0.1");
  return status == "connected" ? (
    <div className="h-screen flex ">
      <Swap
        selectedAction={selectedAction}
        setSelectedAction={setSelectedAction}
        fromChevron={fromChevron}
        toChevron={toChevron}
        setFromChevron={setFromChevron}
        setFromAmount={setFromAmount}
        setToAmount={setToAmount}
        setToChevron={setToChevron}
        fromAmount={fromAmount}
        toAmount={toAmount}
        fromToken={fromToken}
        setFromToken={setFromToken}
        toToken={toToken}
        setToToken={setToToken}
        slippage={slippage}
        setSlippage={setSlippage}
      />
      <div className="flex-1 flex flex-col justify-center p-4 h-full bg-background ">
        <ConnectButton />
        <AIComponent />
      </div>
    </div>
  ) : (
    <div className="h-screen flex flex-col justify-center items-center">
      <Image src="/logo.png" width={100} height={100} alt="" />
      <div>
        <ConnectButton />
      </div>
    </div>
  );
}
