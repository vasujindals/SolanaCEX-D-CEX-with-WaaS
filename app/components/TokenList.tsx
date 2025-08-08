import { TokenWithbalance } from "../api/hooks/useTokens";

export function TokenList({ tokens }: { tokens: TokenWithbalance[] }) {
  return (
    <div className="space-y-2">
      {tokens.map((t) => (
        <TokenRow key={t.name} token={t} />
      ))}
    </div>
  );
}

function TokenRow({ token }: { token: TokenWithbalance }) {
  return (
    <div className="flex justify-between items-center py-2">
      <div className="flex items-center">
        <img src={token.image} className="h-10 w-10 rounded-full mr-3" />
        <div>
          <div className="font-bold text-slate-700">{token.name}</div>
          <div className="text-sm text-slate-500">
            1 {token.name} = ~${token.price}
          </div>
        </div>
      </div>

      <div className="text-right">
        <div className="font-bold text-slate-800">{token.usdBalance}</div>
        <div className="text-sm text-slate-500">{token.balance}</div>
      </div>
    </div>
  );
}
