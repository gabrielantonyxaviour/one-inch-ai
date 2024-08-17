import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Position } from "@/lib/type";

export function Positions({ positions }: { positions: Position[] }) {
  return (
    <div className="space-y-8">
      {positions.length > 0 ? (
        positions.map((position, index) => (
          <div key={index} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src={`/coins/${position.token0}.png`} alt="Avatar" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <Avatar className="h-9 w-9 relative -left-4">
              <AvatarImage src={`/coins/${position.token1}.png`} alt="Avatar" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                {position.token0} / {position.token1}{" "}
                <span className="ml-1 text-muted-foreground text-xs">
                  {position.feeTier}%
                </span>
              </p>
              <p className="text-xs text-muted-foreground">
                Min:{" "}
                <span className="text-white">
                  {position.minThreshold} USDT per BNB -
                </span>{" "}
                Max:{" "}
                <span className="text-white">
                  {position.maxThreshold} USDT per BNB
                </span>
              </p>
            </div>
            <div className="ml-auto space-y-1 text-right">
              <p
                className={`text-sm font-bold ${
                  position.status == "In range"
                    ? "text-green-500"
                    : position.status == "Closed"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                {position.status}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center w-full text-muted-foreground py-4">
          <p className="text-sm">No positions created.</p>
        </div>
      )}
    </div>
  );
}
