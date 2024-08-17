"use client";

import { useAccount, useBalance } from "wagmi";
// import DefaultLanding from "@/components/sections/default-landing";
import { TokenBalance } from "@/components/ui/token-balance";
// import TokenBalanceCard from "@/components/sections/token-balance-card";
import Image from "next/image";
import { PieChartComponent } from "@/components/ui/pie-chart";
import { useEffect, useState } from "react";
import { roundUpToFiveDecimals } from "@/lib/utils";
import { getBalance } from "@wagmi/core";
import { config } from "@/lib/config";
// import { TOKEN_ADDRESSES } from "@/lib/constants";
import Spinner from "@/components/ui/loading";

export default function Page() {
  const { status, address } = useAccount();

  const [bnbBalanceInUSD, setBnbBalanceInUSD] = useState<string | null>(null);
  const [usdcBalance, setUsdcBalance] = useState<string | null>(null);
  const [usdtBalance, setUsdtBalance] = useState<string | null>(null);

  // if (status == "disconnected") return <DefaultLanding />;
  if (
    bnbBalanceInUSD == null ||
    usdcBalance == undefined ||
    usdtBalance == undefined
  )
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <Spinner />
      </div>
    );
  return (
    <div className="flex-1">
      <div className="flex flex-col items-center py-6">
        <Image
          src={"/coins/bnb.png"}
          height={50}
          width={60}
          alt="Binance"
          className="rounded-full"
        />
        <p className="text-3xl mt-4 mb-2 font-bold">Binance Smart Chain</p>
        <p className="text-sm text-muted-foreground ">Net Worth</p>
        <p className="text-md font-semibold">
          <span className="text-muted-foreground mx-1">$</span>
          {roundUpToFiveDecimals(
            (
              parseFloat(bnbBalanceInUSD) +
              parseFloat(usdcBalance) +
              parseFloat(usdtBalance)
            ).toString() || "0"
          )}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <PieChartComponent
          usdBalances={{
            bnb: roundUpToFiveDecimals(bnbBalanceInUSD || "0"),
            usdc: roundUpToFiveDecimals(
              usdcBalance != undefined ? usdcBalance.toString() : "0"
            ),
            usdt: roundUpToFiveDecimals(
              usdtBalance != undefined ? usdtBalance.toString() : "0"
            ),
          }}
        />
      </div>
    </div>
  );
}
