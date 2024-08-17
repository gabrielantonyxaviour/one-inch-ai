import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Label } from "./label";
import Link from "next/link";
import { buttonVariants } from "./button";
import { Plus } from "lucide-react";

export default function PositionsHeader() {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex justify-between items-center">
      <p>UniswapV3 Positions</p>
      <div className="hidden md:flex items-center space-x-6">
        <div className="hidden lg:flex items-center space-x-2">
          <Switch
            checked={checked}
            onCheckedChange={() => {
              setChecked(!checked);
            }}
          />
          <Label htmlFor="airplane-mode" className="text-xs font-semibold">
            View Closed
          </Label>
        </div>

        <Link
          href={"https://app.uniswap.org/add"}
          target="_blank"
          className={`${buttonVariants({
            variant: "secondary",
          })} h-8 px-3 text-xs flex items-center `}
        >
          <Plus className="mr-2 h-4 w-4" /> New Position
        </Link>
      </div>
    </div>
  );
}
