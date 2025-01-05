export interface ICreateExpense {
    name: string,
    description?: string,
    amount: number,
    date: Date,
    _id?: string
}

export interface IUpdateExpense {
    name?: string,
    description?: string,
    amount?: number,
    date?: Date
}