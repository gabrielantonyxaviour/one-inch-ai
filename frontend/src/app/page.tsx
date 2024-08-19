"use client";

import AIComponent from "@/components/sections/ai";
import Swap from "@/components/sections/swap";
import AppComponent from "@/components/ui/app-component";

import ConnectButton from "@/components/ui/connect-button";
import { supportedchains } from "@/lib/constants";
import axios from "axios";
import Image from "next/image";
import { use, useEffect, useState } from "react";
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
  const [fromAmount, setFromAmount] = useState("0");
  const [fromToken, setFromToken] = useState("usdt");
  const [toLoading, setToLoading] = useState(false);
  const [toToken, setToToken] = useState("link");
  const [toAmount, setToAmount] = useState("0");
  const [conversionValue, setConversionValue] = useState("0");
  const [fromCoversionValue, setFromConversionValue] = useState("0");
  const [toCoversionValue, setToConversionValue] = useState("0");
  const [conversionLoading, setConversionLoading] = useState(false);
  const [slippage, setSlippage] = useState("0.1");
  const [sellingPrice, setSellingPrice] = useState("0");
  const [sellingPriceLoading, setSellingPriceLoading] = useState(false);
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

  useEffect(() => {
    (async function () {
      setToLoading(true);
      setConversionLoading(true);
      const response = await axios.get(
        `/api/coinmarketcap/convert?from=${fromToken}&to=${toToken}`
      );

      console.log(response.data);
      setFromConversionValue(response.data.amount.from);
      setToConversionValue(response.data.amount.to);

      if (selectedAction) {
        const cValue = response.data.amount.from / response.data.amount.to;
        setSellingPrice(response.data.amount.from);
        setConversionValue(cValue.toString());
        const f = fromAmount == "" ? "0" : fromAmount;
        setToAmount((parseFloat(f) * cValue).toString());
      } else {
        const cValue = response.data.amount.from / response.data.amount.to;
        console.log(cValue);
        const f = fromAmount == "" ? "0" : fromAmount;
        const s = slippage == "" ? "0" : slippage;
        const cValueWithSlippage = cValue * (1 - parseFloat(s) / 100);

        setConversionValue(cValue.toString());
        setToAmount((parseFloat(f) * cValueWithSlippage).toString());
      }
      setConversionLoading(false);
      setToLoading(false);
    })();
  }, [fromToken, toToken]);

  useEffect(() => {
    if (selectedAction) {
      const f = fromAmount == "" ? "0" : fromAmount;
      const s = sellingPrice == "" ? "0" : sellingPrice;
      setToAmount((parseFloat(f) * parseFloat(s)).toString());
    } else {
      console.log(fromAmount);
      console.log(conversionValue);
      console.log(slippage);
      const f = fromAmount == "" ? "0" : fromAmount;
      const s = slippage == "" ? "0" : slippage;
      setToAmount(
        (
          parseFloat(f) *
          parseFloat(conversionValue) *
          (1 - parseFloat(s) / 100)
        ).toString()
      );
    }
  }, [fromAmount, slippage, sellingPrice]);

  return status == "connected" ? (
    <div className="h-screen flex ">
      <AppComponent
        selectedAction={selectedAction}
        setSelectedAction={setSelectedAction}
        setFromAmount={setFromAmount}
        fromAmount={fromAmount}
        toAmount={toAmount}
        fromToken={fromToken}
        setFromToken={setFromToken}
        toToken={toToken}
        setToToken={setToToken}
        slippage={slippage}
        setSlippage={setSlippage}
        setSellingPrice={setSellingPrice}
        sellingPrice={sellingPrice}
        sellingPriceLoading={sellingPriceLoading}
        toLoading={toLoading}
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
