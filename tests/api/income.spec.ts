import { expect } from '@playwright/test';
import { test } from 'api/fixtures/auth.fixture';
import { normalizeItem } from '../../src/helpers/normalize-item';
import { deleteAllIncomes, deleteAllExpenses } from 'helpers/delete-all-items';

test.describe('Incomes API', () => {
    test.afterEach(async ({ incomeService, expenseService }) => {
        await deleteAllIncomes(incomeService);
        await deleteAllExpenses(expenseService);
    });
    test('add new income transaction and check this transaction in list', async ({ incomeService }) => {
        const newIncomeTransaction: IncomeItem = {
            ID: 'ID-500',
            Date: '2025-04-22',
            Income: '500',
            Currency: 'UAH',
            Comment: '150',
            Cash: false
        };

        const response = await incomeService.createIncome(newIncomeTransaction);
        expect(response).toContain('Successfully created income ID:');
        const idMatch = response.match(/ID:\s([a-f0-9\-]+)/i);
        expect(idMatch, 'ID not found in response').not.toBeNull();
        const createdId = idMatch![1];

        const responseListTransaction = await incomeService.getIncomes();
        const monthKey = '2025-4';
        const incomesThisMonth = responseListTransaction[monthKey];
        const found = incomesThisMonth.some((income) => income.ID === createdId);

        expect(found).toBe(true);
    });

    test('update income transaction and check this transaction in list', async ({ incomeService }) => {
        const newIncomeTransaction: IncomeItem = {
            ID: 'ID-500',
            Date: '2025-04-22',
            Income: '500',
            Currency: 'UAH',
            Comment: '150',
            Cash: false
        };

        const response = await incomeService.createIncome(newIncomeTransaction);
        expect(response).toContain('Successfully created income ID:');

        const allIncomes = await incomeService.getIncomes();
        const [monthKey, incomes] = Object.entries(allIncomes).find(([_, value]) => value.length > 0) || [];

        const incomeToUpdate = incomes[0];
        const updatedIncome: IncomeItem = {
            ID: incomeToUpdate.ID,
            Date: '2025-02-22',
            Income: incomeToUpdate.Income + 20,
            Currency: 'EUR',
            Comment: 'Update test',
            Cash: !incomeToUpdate.Cash
        };

        await incomeService.updateIncome(normalizeItem(updatedIncome));
        const updatedIncomes = await incomeService.getIncomes();
        const updatedList = updatedIncomes['2025-2'] || [];
        const updatedItem = updatedList.find((item) => item.ID === incomeToUpdate.ID);

        expect(updatedItem).toBeTruthy();
        expect(updatedItem?.Date).toBe('2025-02-22T00:00:00');
        expect(updatedItem?.Income).toBe(Number(incomeToUpdate.Income) + 20);
        expect(updatedItem?.Currency).toBe('EUR');
        expect(updatedItem?.Comment).toBe('Update test');
        expect(updatedItem?.Cash).toBe(!incomeToUpdate.Cash);
    });

    test('delete income transaction and check this transaction in list', async ({ incomeService }) => {
        const newIncomeTransaction: IncomeItem = {
            ID: 'ID-500',
            Date: '2025-04-22',
            Income: '500',
            Currency: 'UAH',
            Comment: '150',
            Cash: false
        };

        const response = await incomeService.createIncome(newIncomeTransaction);
        expect(response).toContain('Successfully created income ID:');
        const allIncomes = await incomeService.getIncomes();
        const [monthKey, incomes] = Object.entries(allIncomes).find(([_, value]) => value.length > 0) || [];
        expect(incomes, 'No incomes available to delete').toBeTruthy();

        const incomeToDelete = incomes[0];
        await incomeService.deleteIncome(normalizeItem(incomeToDelete));

        const updatedIncomes = await incomeService.getIncomes();
        const updatedList = updatedIncomes[monthKey] || [];
        const stillExists = updatedList.some((income) => income.ID === incomeToDelete.ID);

        expect(stillExists).toBe(false);
    });
});
