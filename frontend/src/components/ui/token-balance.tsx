import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TokenBalance({
  balances,
  usdBalances,
}: {
  balances: Record<string, string>;
  usdBalances: Record<string, string>;
}) {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/coins/bnb.png" alt="Avatar" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">
            Binance Smart Chain
          </p>
          <p className="text-sm text-muted-foreground">BNB</p>
        </div>
        <div className="ml-auto space-y-1 text-right">
          <p className="text-sm font-medium leading-none">{balances.bnb}</p>
          <p className="text-sm text-muted-foreground">${usdBalances.bnb}</p>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/coins/usdt.png" alt="Avatar" />
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Tether USD</p>
          <p className="text-sm text-muted-foreground">USDT</p>
        </div>
        <div className="ml-auto space-y-1 text-right">
          <p className="text-sm font-medium leading-none">{balances.usdt}</p>
          <p className="text-sm text-muted-foreground">${usdBalances.usdt}</p>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/coins/usdc.png" alt="Avatar" />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Stablecoin USD</p>
          <p className="text-sm text-muted-foreground">USDC</p>
        </div>
        <div className="ml-auto space-y-1 text-right">
          <p className="text-sm font-medium leading-none">{balances.usdc}</p>
          <p className="text-sm text-muted-foreground">${usdBalances.usdc}</p>
        </div>
      </div>
    </div>
  );
}
