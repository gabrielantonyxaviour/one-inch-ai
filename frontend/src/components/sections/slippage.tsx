import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "../ui/input";
import { useState } from "react";

export default function Slippage({
  slippage,
  setSlippage,
}: {
  slippage: string;
  setSlippage: (slippage: string) => void;
}) {
  const [localSlippage, setLocalSlippage] = useState("");
  return (
    <Accordion type="single" collapsible className="text-sm ">
      <AccordionItem value="item-1">
        <AccordionTrigger>Slippage Tolerance</AccordionTrigger>
        <AccordionContent>
          <Tabs defaultValue="0.1" className="w-full">
            <TabsList className="w-full flex">
              <TabsTrigger value="custom" className="flex">
                <input
                  className="m-0 p-0 w-[80px] border-none bg-transparent focus:bg-transparent focus:outline-none"
                  value={localSlippage}
                  placeholder="Custom"
                  onChange={(e) => {
                    setLocalSlippage(e.target.value);
                  }}
                />
                %
              </TabsTrigger>
              <TabsTrigger
                value="0.1"
                className="flex-1"
                onClick={() => {
                  setSlippage("0.1");
                  setLocalSlippage("");
                }}
              >
                0.1 %
              </TabsTrigger>
              <TabsTrigger
                value="0.5"
                className="flex-1"
                onClick={() => {
                  setSlippage("0.5");
                  setLocalSlippage("");
                }}
              >
                0.5 %
              </TabsTrigger>
              <TabsTrigger
                value="1"
                className="flex-1"
                onClick={() => {
                  setSlippage("1");
                  setLocalSlippage("");
                }}
              >
                1 %
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
