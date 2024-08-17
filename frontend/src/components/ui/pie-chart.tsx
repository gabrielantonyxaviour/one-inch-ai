"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function PieChartComponent({
  usdBalances,
}: {
  usdBalances: Record<string, string>;
}) {
  const chartData = [
    {
      token: "bnb",
      balance: parseFloat(usdBalances.bnb),
      fill: "var(--color-bnb)",
    },
    {
      token: "usdc",
      balance: parseFloat(usdBalances.usdc),
      fill: "var(--color-usdc)",
    },
    {
      token: "usdt",
      balance: parseFloat(usdBalances.usdt),
      fill: "var(--color-usdt)",
    },
  ];
  const chartConfig = {
    balance: {
      label: "USD",
    },
    bnb: {
      label: "BNB",
      color: "#F0B90B",
    },
    usdc: {
      label: "USDC",
      color: "#2775CA",
    },
    usdt: {
      label: "USDT",
      color: "#26A17B",
    },
  } satisfies ChartConfig;
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="balance"
          nameKey="token"
          innerRadius={60}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-2xl font-bold"
                    >
                      {chartData
                        .reduce((acc, { balance }) => acc + balance, 0)
                        .toFixed(2)
                        .toString() || "0"}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      USD
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
