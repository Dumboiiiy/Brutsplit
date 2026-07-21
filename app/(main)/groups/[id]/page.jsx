"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "../../../../convex/_generated/api";
import { useConvexQuery } from "../../../../hooks/use-convex-query";
import { BarLoader } from "react-spinners";
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
import { PlusCircle, ArrowLeftRight, ArrowLeft, Users } from "lucide-react";
import { ExpenseList } from "../../../../components/expense-list";
import { SettlementList } from "../../../../components/settlement-list";
import { GroupBalances } from "../../../../components/group-balances";
import { GroupMembers } from "../../../../components/group-members";

export default function GroupExpensesPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("expenses");

  const { data, isLoading } = useConvexQuery(api.groups.getGroupExpenses, {
    groupId: params.id,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <BarLoader width={"100%"} color="#36d7b7" />
      </div>
    );
  }

  const group = data?.group;
  const members = data?.members || [];
  const expenses = data?.expenses || [];
  const settlements = data?.settlements || [];
  const balances = data?.balances || [];
  const userLookupMap = data?.userLookupMap || {};

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
            <div className="border-4 border-black p-4 bg-[#70CDDE] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <Users className="h-8 w-8 text-black" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-black">{group?.name}</h1>
              <p className="font-medium text-black/70">{group?.description}</p>
              <p className="text-sm font-medium text-black/70 mt-1">
                {members.length} members
              </p>
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

      {/* Grid layout for group details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card className="border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold text-black">
                Group Balances
              </CardTitle>
            </CardHeader>
            <CardContent>
              <GroupBalances balances={balances} />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold text-black">
                Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <GroupMembers members={members} />
            </CardContent>
          </Card>
        </div>
      </div>

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
            showOtherPerson={true}
            isGroupExpense={true}
            userLookupMap={userLookupMap}
          />
        </TabsContent>

        <TabsContent value="settlements" className="space-y-4">
          <SettlementList
            settlements={settlements}
            isGroupSettlement={true}
            userLookupMap={userLookupMap}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
