"use client";

import AIComponent from "@/components/sections/ai";
import Swap from "@/components/sections/swap";

import ConnectButton from "@/components/ui/connect-button";
import { supportedchains } from "@/lib/constants";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount, useBalance, useSwitchChain } from "wagmi";

interface ClassifyResponse {
  response: string;
  action: string;
  params: string[];
}

export default function Page() {
  const { status, address, chainId } = useAccount();
  const { switchChain } = useSwitchChain();
  const [selectedAction, setSelectedAction] = useState(false);
  const [fromChevron, setFromChevron] = useState(false);
  const [toChevron, setToChevron] = useState(false);
  const [fromAmount, setFromAmount] = useState("0");
  const [fromToken, setFromToken] = useState("usdt");
  const [toToken, setToToken] = useState("link");
  const [toAmount, setToAmount] = useState("0");
  const [slippage, setSlippage] = useState("0.1");
  const [classifyResponse, setClassifyResponse] = useState<ClassifyResponse>({
    response: "",
    action: "",
    params: [],
  });

  useEffect(() => {
    console.log("Classify Response");
    console.log(classifyResponse);
    if (classifyResponse.action.length > 0) {
      if (classifyResponse.action == "swap") {
        const chain = classifyResponse.params[0];
        if (
          chain.toLocaleLowerCase() !=
          supportedchains[chainId || 11155111].symbol.toLocaleLowerCase()
        )
          switchChain({
            chainId:
              supportedchains[classifyResponse.params[0].toLocaleLowerCase()],
          });
        setFromToken(classifyResponse.params[1]);
        setToToken(classifyResponse.params[2]);
        setSlippage(classifyResponse.params[3]);
        setFromAmount(classifyResponse.params[4]);
      }
    }
  }, [classifyResponse]);
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
        <AIComponent
          classifyResponse={classifyResponse}
          setClassifyResponse={setClassifyResponse}
        />
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
