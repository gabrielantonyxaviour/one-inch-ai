import { LineChart, LineChartIcon, LucideGanttChartSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

export default function BoxCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: any;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs xl:text-sm font-medium">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div
          className={`text-md md:text-lg lg:text-xl font-bold ${
            title == "Profit / Loss" || title == "Claimed Fees"
              ? value[0] == "+"
                ? "text-green-500"
                : value[0] == "-"
                ? "text-red-500"
                : ""
              : ""
          }`}
        >
          {title != "Positions" && <span className={` `}>$</span>} {value}
        </div>
        <p className="text-xs text-muted-foreground">+0% from last month</p>
      </CardContent>
    </Card>
  );
}
