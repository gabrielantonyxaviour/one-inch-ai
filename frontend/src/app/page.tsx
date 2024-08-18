"use client";

import AIComponent from "@/components/sections/ai";
import { useAccount, useBalance } from "wagmi";

export default function Page() {
  const { status, address } = useAccount();

  return (
    <div className="h-screen flex ">
      <div className="w-[75%]"></div>
      <div className="flex-1 flex flex-col justify-center p-4 h-full bg-background border-l-[0.1px] border-primary">
        <AIComponent />
      </div>
    </div>
  );
}
