interface ExpenseItem {
    ID: string;
    Date: string;
    Expense: string;
    Currency: string;
    Comment: string;
    Cash: boolean;
}

interface ExpenseResponse {
    [monthYear: string]: ExpenseItem[];
}
