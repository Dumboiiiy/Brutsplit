"use client";

import { useConvexQuery } from "../hooks/use-convex-query";
import { api } from "../convex/_generated/api";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

export function GroupMembers({ members }) {
  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);

  if (!members || members.length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        No members in this group
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {members.map((member) => {
        const isCurrentUser = member.id === currentUser?._id;
        const isAdmin = member.role === "admin";

        return (
          <div key={member.id} className="flex items-center justify-between border-2 border-black p-2 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-2">
              <div className="border-2 border-black rounded-full overflow-hidden">
                <Avatar className="h-8 w-8 rounded-none">
                  <AvatarImage src={member.imageUrl} />
                  <AvatarFallback className="bg-[#FFDC02] text-black font-bold">
                    {member.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-black">
                    {isCurrentUser ? "You" : member.name}
                  </span>
                  {isCurrentUser && (
                    <div className="border-2 border-black px-2 py-0 bg-[#6CBD45] text-white font-bold text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      You
                    </div>
                  )}
                </div>
                {isAdmin && (
                  <span className="text-xs font-bold text-[#7189FF]">Admin</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
