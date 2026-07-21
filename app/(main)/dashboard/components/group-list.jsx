import Link from "next/link";
import { Users } from "lucide-react";

export function GroupList({ groups }) {
  if (!groups || groups.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-muted-foreground">No groups yet</p>
        <p className="text-sm text-muted-foreground mt-1">
          Create a group to start tracking shared expenses
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {groups.map((group) => {
        // Calculate total balance in the group
        const balance = group.balance || 0;
        const hasBalance = balance !== 0;

        return (
          <Link
            href={`/groups/${group.id}`}
            key={group.id}
            className="flex items-center justify-between border-2 border-black p-2 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="border-4 border-black p-2 bg-[#70CDDE]">
                <Users className="h-5 w-5 text-black" />
              </div>
              <div>
                <p className="font-bold text-black">{group.name}</p>
                <p className="text-xs font-medium text-black/70">
                  {group.members.length} members
                </p>
              </div>
            </div>

            {hasBalance && (
              <span
                className={`text-sm font-bold ${
                  balance > 0 ? "text-[#6CBD45]" : "text-[#FF5052]"
                }`}
              >
                {balance > 0 ? "+" : ""}${balance.toFixed(2)}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
