export function normalizeItem(item: IncomeItem): IncomeItem;
export function normalizeItem(item: ExpenseItem): ExpenseItem;
export function normalizeItem(item: IncomeItem | ExpenseItem): IncomeItem | ExpenseItem {
    if ('Income' in item) {
        return {
            ...item,
            Income: String(item.Income)
        };
    } else if ('Expense' in item) {
        return {
            ...item,
            Expense: String(item.Expense)
        };
    }
    return item;
}
