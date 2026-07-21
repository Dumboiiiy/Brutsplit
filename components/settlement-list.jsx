"use client";

import { useState } from "react";
import { useConvexQuery } from "../hooks/use-convex-query";
import { api } from "../convex/_generated/api";
import { format } from "date-fns";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeftRight } from "lucide-react";
import Link from "next/link";

export function SettlementList({
  settlements,
  isGroupSettlement = false,
  userLookupMap,
}) {
  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);
  console.log("settlements", settlements);

  if (!settlements || !settlements.length) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          No settlements found
        </CardContent>
      </Card>
    );
  }

  // Helper to get user details from cache or look up
  const getUserDetails = (userId) => {
    // Simplified fallback
    return {
      name:
        userId === currentUser?._id
          ? "You"
          : userLookupMap[userId]?.name || "Other User",
      imageUrl: null,
      id: userId,
    };
  };

  return (
    <div className="flex flex-col gap-4">
      {settlements.map((settlement) => {
        const payer = getUserDetails(settlement.paidByUserId);
        const receiver = getUserDetails(settlement.receivedByUserId);
        const isCurrentUserPayer = settlement.paidByUserId === currentUser?._id;
        const isCurrentUserReceiver =
          settlement.receivedByUserId === currentUser?._id;

        return (
          <Card
            className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            key={settlement._id}
          >
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Settlement icon */}
                  <div className="border-4 border-black p-2 bg-[#FFDC02] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <ArrowLeftRight className="h-5 w-5 text-black" />
                  </div>

                  <div>
                    <h3 className="font-bold text-black">
                      {isCurrentUserPayer
                        ? `You paid ${receiver.name}`
                        : isCurrentUserReceiver
                          ? `${payer.name} paid you`
                          : `${payer.name} paid ${receiver.name}`}
                    </h3>
                    <div className="flex items-center text-sm font-medium text-black/70 gap-2">
                      <span>
                        {format(new Date(settlement.date), "MMM d, yyyy")}
                      </span>
                      {settlement.note && (
                        <>
                          <span>•</span>
                          <span>{settlement.note}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-black">
                    ${settlement.amount.toFixed(2)}
                  </div>
                  {isGroupSettlement ? (
                    <div className="mt-1 border-2 border-black px-2 py-0.5 bg-[#70CDDE] text-black font-bold text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      Group settlement
                    </div>
                  ) : (
                    <div className="text-sm font-bold">
                      {isCurrentUserPayer ? (
                        <span className="text-[#FFDC02]">You paid</span>
                      ) : isCurrentUserReceiver ? (
                        <span className="text-[#6CBD45]">You received</span>
                      ) : (
                        <span className="text-black">Payment</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
