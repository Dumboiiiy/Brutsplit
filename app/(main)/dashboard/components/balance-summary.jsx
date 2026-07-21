import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

export function BalanceSummary({ balances }) {
  if (!balances) return null;

  const { oweDetails } = balances;
  const hasOwed = oweDetails.youAreOwedBy.length > 0;
  const hasOwing = oweDetails.youOwe.length > 0;

  return (
    <div className="space-y-4">
      {!hasOwed && !hasOwing && (
        <div className="text-center py-6 border-4 border-black bg-[#FFDC02] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-bold text-black">You're all settled up! 🎉</p>
        </div>
      )}

      {hasOwed && (
        <div>
          <h3 className="text-sm font-bold flex items-center mb-3 text-black">
            <ArrowUpCircle className="h-4 w-4 text-[#6CBD45] mr-2" />
            Owed to you
          </h3>
          <div className="space-y-3">
            {oweDetails.youAreOwedBy.map((item) => (
              <Link
                href={`/person/${item.userId}`}
                key={item.userId}
                className="flex items-center justify-between border-2 border-black p-2 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
              >
                <div className="flex items-center gap-2">
                  <div className="border-2 border-black rounded-full overflow-hidden">
                    <Avatar className="h-8 w-8 rounded-none">
                      <AvatarImage src={item.imageUrl} />
                      <AvatarFallback className="bg-[#FFDC02] text-black font-bold">
                        {item.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <span className="text-sm font-bold text-black">{item.name}</span>
                </div>
                <span className="font-bold text-[#6CBD45]">
                  ${item.amount.toFixed(2)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {hasOwing && (
        <div>
          <h3 className="text-sm font-bold flex items-center mb-3 text-black">
            <ArrowDownCircle className="h-4 w-4 text-[#FF5052] mr-2" />
            You owe
          </h3>
          <div className="space-y-3">
            {oweDetails.youOwe.map((item) => (
              <Link
                href={`/person/${item.userId}`}
                key={item.userId}
                className="flex items-center justify-between border-2 border-black p-2 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
              >
                <div className="flex items-center gap-2">
                  <div className="border-2 border-black rounded-full overflow-hidden">
                    <Avatar className="h-8 w-8 rounded-none">
                      <AvatarImage src={item.imageUrl} />
                      <AvatarFallback className="bg-[#FFDC02] text-black font-bold">
                        {item.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <span className="text-sm font-bold text-black">{item.name}</span>
                </div>
                <span className="font-bold text-[#FF5052]">
                  ${item.amount.toFixed(2)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
