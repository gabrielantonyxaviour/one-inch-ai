"use client";

import AIComponent from "@/components/sections/ai";
import { useAccount, useBalance } from "wagmi";

export default function Page() {
  const { status, address } = useAccount();

  return (
    <div className="h-screen flex ">
      <div className="w-[75%]"></div>
      <div className="flex-1 p-4 h-[85%] my-auto">
        <AIComponent />
      </div>
    </div>
  );
}
