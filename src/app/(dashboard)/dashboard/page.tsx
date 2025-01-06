/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Edit, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { format } from "date-fns"
import { useCallback, useEffect, useMemo, useState } from "react";
import { Pie, PieChart } from "recharts"

import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart"
import { useGetAllExpenses } from "@/hooks/expeses/use-get-expenses";
import AddExpenseDialog from "@/components/add-expense/add-edit-expense";
import { useDeleteExpense } from "@/hooks/expeses/use-delete-expense";

const Page = () => {
    const { data: session }: any = useSession()
    const userId = session?.user?.id;
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [open, setOpen] = useState(false);
    const [mode, setExpensesActionMode] = useState('create');
    const [selectedExpense, setSelectedExpense] = useState({});
    //
    const expenses = userId
        ? useGetAllExpenses(userId, { date })
        : { data: [] };
    //
    const deleteExpense = useDeleteExpense()
    //
    const chartData = useMemo(() => {
        return expenses?.data?.map((item, index) => ({
            id: item._id,
            name: item.name,
            amount: item.amount,
            fill: `hsl(var(--chart-${index + 1}))`,
        })) ?? [];
    }, [expenses?.data]);
    //
    const totalExpensesAmount = useMemo(() =>
        expenses?.data?.reduce((sum, expense) => sum + expense.amount, 0) ?? 0,
        [expenses?.data]
    );;
    //
    const chartConfig = useMemo(() => {
        const chartConfig: Record<string, { label: string; color: string }> = {};
        if (chartData)
            chartData.forEach((item, index) => {
                chartConfig[item.name] = {
                    label: item.name,
                    color: `hsl(var(--chart-${index + 1}))`,
                }
            });
        //
        return chartConfig;
    }, [chartData]);
    //
    const editExpense = useCallback((expense: any) => {
        setSelectedExpense(expense);
        setOpen(!open);
        setExpensesActionMode('edit');
    }, [])
    //
    useEffect(() => {
        if (!open) {
            setSelectedExpense({})
            setExpensesActionMode('create')
        };
    }, [open]);
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow mb-6">
                {(session?.user?.maxExpensesLimit * 90) / 100 <= totalExpensesAmount && (
                    <div className="w-2/3">
                        <h1 className="text-2xl font-bold text-red-500">You are reached the maximum limit</h1>
                    </div>)}
                <div className="w-2/3">
                    <h1 className="text-2xl font-bold">Expenses Management Dashboard</h1>
                    <h1 className="text-sm font-bold">Montly Limit :- LKR {session?.user?.maxExpensesLimit?.toFixed(2)}</h1>
                </div>
                <div className="w-1/3 flex items-center justify-end space-x-4">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                {date ? (
                                    format(date, "PPP")
                                ) : (
                                    <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={(data) => setDate(data)}
                                disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <Button variant="default" onClick={() => setOpen(!open)}>
                        Add Expense
                    </Button>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <h2 className="text-xl font-semibold mb-4">Expenses</h2>
                <div className="h-64 flex items-center justify-center">
                    {/* Placeholder for Pie Chart */}
                    {chartData.length > 0 ? (
                        <ChartContainer
                            config={chartConfig}
                            className="mx-auto aspect-square max-h-[300px] w-6/12"
                        >
                            <PieChart>
                                <Pie data={chartData} dataKey="amount" />
                                <ChartLegend
                                    content={<ChartLegendContent nameKey="name" />}
                                    className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                                />
                            </PieChart>
                        </ChartContainer>) : (
                        <p>No data available for chart</p>
                    )}
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Expense Table</h2>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2 text-left">Name</th>
                            <th className="border p-2 text-left">Description</th>
                            <th className="border p-2 text-left">Amount</th>
                            <th className="border p-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses?.data?.map((expense, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="border p-2">{expense?.name}</td>
                                <td className="border p-2">{expense?.description}</td>
                                <td className="border p-2">LRK {expense?.amount.toFixed(2)}</td>
                                <td className="border p-2 flex items-center justify-center space-x-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-blue-600 hover:text-blue-800"
                                        onClick={() => editExpense(expense)}
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={async () => deleteExpense.mutateAsync({ userId: session.user.id, id: expense._id })}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <Trash className="w-4 h-4" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            <AddExpenseDialog mode={mode} userId={session?.user?.id} open={open} setOpen={setOpen} totalExpensesAmount={totalExpensesAmount} expenseData={selectedExpense} />
        </div>
    )
}
//
export default Page;