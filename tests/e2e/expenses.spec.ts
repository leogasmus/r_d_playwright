import { expect } from '@playwright/test';
import { test } from 'e2e/fixture/page.fixture';
import { deleteAllExpenses, deleteAllIncomes } from 'helpers/delete-all-items';

test.describe('User can', () => {
    test.beforeEach(async ({ incomeService, expenseService }) => {
        await deleteAllIncomes(incomeService);
        await deleteAllExpenses(expenseService);
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    test('add new transaction and find element by ID', async ({ loggedInPage, expensesPage, mainPage, page }) => {
        await mainPage.goToExpensesPage();

        const responsePromise = page.waitForResponse((resp) => resp.url().includes('/api/expenses/add') && resp.status() === 200);

        await expensesPage.addNewTransaction('2025-11-01', '56');

        const response = await responsePromise;
        const body = await response.text();
        const id = body.match(/ID: ([\w-]+)/)?.[1];

        expect(id).toBeTruthy();

        const row = expensesPage.getRowById(id);
        await expect(row).toBeVisible();
        await expensesPage.validateRowValues(id, '11/1/2025', '56', 'UAH');
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    test('add new transaction and delete element by ID', async ({ loggedInPage, expensesPage, mainPage, page }) => {
        await mainPage.goToExpensesPage();

        const responsePromise = page.waitForResponse((resp) => resp.url().includes('/api/expenses/add') && resp.status() === 200);

        await expensesPage.addNewTransaction('2025-02-16', '1850');

        const response = await responsePromise;
        const body = await response.text();
        const id = body.match(/ID: ([\w-]+)/)?.[1];

        expect(id).toBeTruthy();

        const row = expensesPage.getRowById(id);
        await expect(row).toBeVisible();
        await expensesPage.deleteTransactionById(id);
        await expect(expensesPage.getRowById(id)).toBeHidden({ timeout: 5000 });
    });
});
