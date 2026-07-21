"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function ExpenseSummary({ monthlySpending, totalSpent }) {
  // Format monthly data for chart
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const chartData =
    monthlySpending?.map((item) => {
      const date = new Date(item.month);
      return {
        name: monthNames[date.getMonth()],
        amount: item.total,
      };
    }) || [];

  // Get current year
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  return (
    <Card className="border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white">
      <CardHeader>
        <CardTitle className="font-bold text-black">Expense Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="border-4 border-black bg-[#FFF1E8] p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-sm font-bold text-black/70">Total this month</p>
            <h3 className="text-2xl font-bold mt-1 text-black">
              ${monthlySpending?.[currentMonth]?.total.toFixed(2) || "0.00"}
            </h3>
          </div>
          <div className="border-4 border-black bg-[#FFF1E8] p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-sm font-bold text-black/70">Total this year</p>
            <h3 className="text-2xl font-bold mt-1 text-black">
              ${totalSpent?.toFixed(2) || "0.00"}
            </h3>
          </div>
        </div>

        <div className="h-64 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#000" strokeOpacity={0.2} />
              <XAxis dataKey="name" stroke="#000" strokeOpacity={0.5} fontSize={12} fontWeight="bold" />
              <YAxis stroke="#000" strokeOpacity={0.5} fontSize={12} fontWeight="bold" />
              <Tooltip
                formatter={(value) => [`$${value.toFixed(2)}`, "Amount"]}
                labelFormatter={() => "Spending"}
                contentStyle={{
                  backgroundColor: "#FFF1E8",
                  border: "4px solid #000",
                  borderRadius: "0",
                  fontWeight: "bold",
                  boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)"
                }}
              />
              <Bar dataKey="amount" fill="#7189FF" radius={[0, 0, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <p className="text-xs font-bold text-black/70 text-center mt-2">
          Monthly spending for {currentYear}
        </p>
      </CardContent>
    </Card>
  );
}
