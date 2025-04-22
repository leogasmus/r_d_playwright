interface IncomeItem {
    ID: string;
    Date: string;
    Income: string;
    Currency: string;
    Comment: string;
    Cash: boolean;
}

interface IncomesResponse {
    [monthYear: string]: IncomeItem[];
}
