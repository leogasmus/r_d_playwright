export function normalizeIncomeItem(item: IncomeItem): IncomeItem {
    return {
        ...item,
        Income: String(item.Income)
    };
}
