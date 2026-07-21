"use client";

import { useConvexQuery } from "../hooks/use-convex-query";
import { api } from "../convex/_generated/api";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

/**
 * Expected `balances` shape (one object per member):
 * {
 *   id:           string;           // user id
 *   name:         string;
 *   imageUrl?:    string;
 *   totalBalance: number;           // + ve ⇒ they are owed, – ve ⇒ they owe
 *   owes:   { to: string;   amount: number }[];  // this member → others
 *   owedBy: { from: string; amount: number }[];  // others → this member
 * }
 */
export function GroupBalances({ balances }) {
  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);

  /* ───── guards ────────────────────────────────────────────────────────── */
  if (!balances?.length || !currentUser) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        No balance information available
      </div>
    );
  }

  /* ───── helpers ───────────────────────────────────────────────────────── */
  const me = balances.find((b) => b.id === currentUser._id);
  if (!me) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        You’re not part of this group
      </div>
    );
  }

  const userMap = Object.fromEntries(balances.map((b) => [b.id, b]));

  // Who owes me?
  const owedByMembers = me.owedBy
    .map(({ from, amount }) => ({ ...userMap[from], amount }))
    .sort((a, b) => b.amount - a.amount);

  // Whom do I owe?
  const owingToMembers = me.owes
    .map(({ to, amount }) => ({ ...userMap[to], amount }))
    .sort((a, b) => b.amount - a.amount);

  const isAllSettledUp =
    me.totalBalance === 0 &&
    owedByMembers.length === 0 &&
    owingToMembers.length === 0;

  /* ───── UI ────────────────────────────────────────────────────────────── */
  return (
    <div className="space-y-4">
      {/* Current user's total balance */}
      <div className="text-center pb-4 border-b-4 border-black">
        <p className="text-sm font-bold text-black/70 mb-1">Your balance</p>
        <p
          className={`text-2xl font-bold ${
            me.totalBalance > 0
              ? "text-[#6CBD45]"
              : me.totalBalance < 0
                ? "text-[#FF5052]"
                : "text-black"
          }`}
        >
          {me.totalBalance > 0
            ? `+$${me.totalBalance.toFixed(2)}`
            : me.totalBalance < 0
              ? `-$${Math.abs(me.totalBalance).toFixed(2)}`
              : "$0.00"}
        </p>
        <p className="text-sm font-bold text-black/70 mt-1">
          {me.totalBalance > 0
            ? "You are owed money"
            : me.totalBalance < 0
              ? "You owe money"
              : "You are all settled up"}
        </p>
      </div>

      {isAllSettledUp ? (
        <div className="text-center py-4 border-4 border-black bg-[#FFDC02] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-bold text-black">Everyone is settled up! 🎉</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* People who owe the current user */}
          {owedByMembers.length > 0 && (
            <div>
              <h3 className="text-sm font-bold flex items-center mb-3 text-black">
                <ArrowUpCircle className="h-4 w-4 text-[#6CBD45] mr-2" />
                Owed to you
              </h3>
              <div className="space-y-3">
                {owedByMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between border-2 border-black p-2 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <div className="flex items-center gap-2">
                      <div className="border-2 border-black rounded-full overflow-hidden">
                        <Avatar className="h-8 w-8 rounded-none">
                          <AvatarImage src={member.imageUrl} />
                          <AvatarFallback className="bg-[#FFDC02] text-black font-bold">
                            {member.name?.charAt(0) ?? "?"}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <span className="text-sm font-bold text-black">{member.name}</span>
                    </div>
                    <span className="font-bold text-[#6CBD45]">
                      ${member.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* People the current user owes */}
          {owingToMembers.length > 0 && (
            <div>
              <h3 className="text-sm font-bold flex items-center mb-3 text-black">
                <ArrowDownCircle className="h-4 w-4 text-[#FF5052] mr-2" />
                You owe
              </h3>
              <div className="space-y-3">
                {owingToMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between border-2 border-black p-2 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <div className="flex items-center gap-2">
                      <div className="border-2 border-black rounded-full overflow-hidden">
                        <Avatar className="h-8 w-8 rounded-none">
                          <AvatarImage src={member.imageUrl} />
                          <AvatarFallback className="bg-[#FFDC02] text-black font-bold">
                            {member.name?.charAt(0) ?? "?"}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <span className="text-sm font-bold text-black">{member.name}</span>
                    </div>
                    <span className="font-bold text-[#FF5052]">
                      ${member.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
