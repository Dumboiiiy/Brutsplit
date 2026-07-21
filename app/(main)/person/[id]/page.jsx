"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "../../../../convex/_generated/api";
import { useConvexQuery } from "../../../../hooks/use-convex-query";
import { BarLoader } from "react-spinners";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../components/ui/tabs";
import { PlusCircle, ArrowLeftRight, ArrowLeft } from "lucide-react";
import { ExpenseList } from "../../../../components/expense-list";
import { SettlementList } from "../../../../components/settlement-list";

export default function PersonExpensesPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("expenses");

  const { data, isLoading } = useConvexQuery(
    api.expenses.getExpensesBetweenUsers,
    { userId: params.id },
  );

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <BarLoader width={"100%"} color="#36d7b7" />
      </div>
    );
  }

  const otherUser = data?.otherUser;
  const expenses = data?.expenses || [];
  const settlements = data?.settlements || [];
  const balance = data?.balance || 0;

  return (
    <div className="container mx-auto py-6 max-w-4xl bg-[#FFF1E8]">
      <div className="mb-6">
        <Button
          variant="outline"
          size="sm"
          className="mb-4 border-4 border-black bg-white text-black font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
            <div className="border-4 border-black rounded-full overflow-hidden shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <Avatar className="h-16 w-16 rounded-none">
                <AvatarImage src={otherUser?.imageUrl} />
                <AvatarFallback className="bg-[#FFDC02] text-black font-bold text-2xl">
                  {otherUser?.name?.charAt(0) || "?"}
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-black">
                {otherUser?.name}
              </h1>
              <p className="font-medium text-black/70">{otherUser?.email}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              asChild
              variant="outline"
              className="border-4 border-black bg-white text-black font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
            >
              <Link
                href={`/settlements/group/${params.id}`}
                className="flex items-center gap-2"
              >
                <ArrowLeftRight className="h-4 w-4" />
                Settle up
              </Link>
            </Button>

            <Button
              asChild
              className="border-4 border-black bg-[#6CBD45] text-white font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <Link href={`/expenses/new`} className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Add expense
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Balance card */}
      <Card className="mb-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold text-black">
            Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              {balance === 0 ? (
                <p className="font-bold text-black">You are all settled up</p>
              ) : balance > 0 ? (
                <p className="font-bold text-black">
                  <span className="text-[#6CBD45]">{otherUser?.name}</span> owes
                  you
                </p>
              ) : (
                <p className="font-bold text-black">
                  You owe{" "}
                  <span className="text-[#FF5052]">{otherUser?.name}</span>
                </p>
              )}
            </div>
            <div
              className={`text-2xl font-bold ${balance > 0 ? "text-[#6CBD45]" : balance < 0 ? "text-[#FF5052]" : "text-black"}`}
            >
              ${Math.abs(balance).toFixed(2)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for expenses and settlements */}
      <Tabs
        defaultValue="expenses"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-2 border-4 border-black bg-[#FFF1E8] p-0">
          <TabsTrigger
            value="expenses"
            className="data-[state=active]:bg-[#FFDC02] data-[state=active]:text-black font-bold text-black border-r-4 border-black data-[state=active]:shadow-[inset_3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            Expenses ({expenses.length})
          </TabsTrigger>
          <TabsTrigger
            value="settlements"
            className="data-[state=active]:bg-[#FFDC02] data-[state=active]:text-black font-bold text-black data-[state=active]:shadow-[inset_3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            Settlements ({settlements.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="expenses" className="space-y-4">
          <ExpenseList
            expenses={expenses}
            showOtherPerson={false}
            otherPersonId={params.id}
            userLookupMap={{ [otherUser.id]: otherUser }}
          />
        </TabsContent>

        <TabsContent value="settlements" className="space-y-4">
          <SettlementList
            settlements={settlements}
            userLookupMap={{ [otherUser.id]: otherUser }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
