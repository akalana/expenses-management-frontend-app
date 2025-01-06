/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { CalendarIcon } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { DialogHeader, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';
import { useCreateExpense } from "@/hooks/expeses/use-create-expense";
import { useUpdateExpense } from "@/hooks/expeses/use-update-expense";
import { useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const AddExpenseDialog = ({ mode, userId, open, setOpen, totalExpensesAmount, expenseData = {} }: any) => {
    //
    const { data: session }: any = useSession()
    const createExpense = useCreateExpense(userId);
    const updateExpense = useUpdateExpense(userId, expenseData?._id)


    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            name: "",
            description: "",
            amount: 0,
            date: new Date(),
        },
    });
    // Update the form values if expenseData is provided
    useEffect(() => {
        if (mode === 'edit' && expenseData && Object.keys(expenseData).length > 0) {
            reset({
                name: expenseData.name || "",
                description: expenseData.description || "",
                amount: expenseData.amount || 0,
                date: expenseData.date ? new Date(expenseData.date) : new Date(),
            });
        } else {
            reset();
        }
    }, [expenseData, mode, reset]);
    //
    const checkExpenseLimit = useCallback(
        (amount: number) => {
            if (session?.user?.maxExpensesLimit > totalExpensesAmount + amount) {
                return true;
            } else {
                toast.error("Cannot add new expenses, as it exceeds the maximum limit");
                return false;
            }
        },
        [session?.user?.maxExpensesLimit, totalExpensesAmount]
    );
    //
    const submitHandler = useCallback(async (data: any) => {
        if (checkExpenseLimit(data.amount)) {
            if (mode === 'create') {
                await createExpense.mutateAsync(data);
            } else {
                await updateExpense.mutateAsync(data);
            }
            reset();
            setOpen(false);
        }
    }, [checkExpenseLimit, createExpense, updateExpense, mode, reset, setOpen]);
    //
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-lg p-4" aria-labelledby="dialog-title" aria-describedby="dialog-description">
                <DialogHeader>
                    <DialogTitle>
                        {mode === "edit" ? "Edit Expense" : "Add Expense"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Expense Name</Label>
                        <Input
                            id="name"
                            placeholder="Enter expense name"
                            {...register("name", { required: "Expense name is required" })}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message?.toString()}</p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="description">Expense Description (Optional)</Label>
                        <Textarea
                            id="description"
                            placeholder="Enter description (optional)"
                            {...register("description")}
                        />
                    </div>
                    <div>
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                            id="amount"
                            type="number"
                            placeholder="Enter amount"
                            {...register("amount", {
                                required: "Amount is required",
                                valueAsNumber: true,
                                validate: (value) => value > 0 || "Amount must be greater than zero",
                            })}
                        />
                        {errors.amount && (
                            <p className="text-red-500 text-sm mt-1">{errors.amount.message?.toString()}</p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="date">Date</Label>
                        <Controller
                            control={control}
                            name="date"
                            rules={{ required: "Date is required" }}
                            render={({ field }) => (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <DayPicker
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                        />
                                    </PopoverContent>
                                </Popover>
                            )}
                        />
                        {errors.date && (
                            <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
                        )}
                    </div>
                    <DialogFooter>
                        <Button type="submit" variant="default">
                            {mode === "edit" ? "Update Expense" : "Create Expense"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddExpenseDialog;
