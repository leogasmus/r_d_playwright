import { IncomesService } from 'api/services/income.service';
import { normalizeItem } from './normalize-item';
import { ExpenseService } from 'api/services/expense.service';

export async function deleteAllIncomes(incomeService: IncomesService): Promise<void> {
    console.log('Starting cleanup of all income transactions...');
    const allIncomes = await incomeService.getIncomes();

    if (allIncomes && Object.keys(allIncomes).length > 0) {
        for (const monthKey in allIncomes) {
            if (Array.isArray(allIncomes[monthKey])) {
                for (const income of allIncomes[monthKey]) {
                    if (income.ID) {
                        try {
                            await incomeService.deleteIncome(normalizeItem(income));
                            console.log(`Deleted income with ID: ${income.ID}`);
                        } catch (error) {
                            console.error(`Error deleting income with ID ${income.ID}:`, error);
                        }
                    }
                }
            }
        }
        console.log('Cleanup of all income transactions finished.');
    } else {
        console.log('No income transactions found to delete.');
    }
}

export async function deleteAllExpenses(expenseService: ExpenseService): Promise<void> {
    console.log('Starting cleanup of all income transactions...');
    const allExpenses = await expenseService.getExpenses();

    if (allExpenses && Object.keys(allExpenses).length > 0) {
        for (const monthKey in allExpenses) {
            if (Array.isArray(allExpenses[monthKey])) {
                for (const expense of allExpenses[monthKey]) {
                    if (expense.ID) {
                        try {
                            await expenseService.deleteExpense(normalizeItem(expense));
                            console.log(`Deleted expense with ID: ${expense.ID}`);
                        } catch (error) {
                            console.error(`Error deleting expense with ID ${expense.ID}:`, error);
                        }
                    }
                }
            }
        }
        console.log('Cleanup of all expense transactions finished.');
    } else {
        console.log('No expense transactions found to delete.');
    }
}
