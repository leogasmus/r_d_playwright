import { expect } from '@playwright/test';
import { test } from 'e2e/fixture/page.fixture';

test.describe('User can', () => {
    test('log in via email and password', async ({ mainPage, loginPage }) => {
        await mainPage.goto();
        await mainPage.goToLogin();
        await loginPage.fillLogInForm('xotifa2041@linxues.com', "9#'d=buSWS-9BPp");
        await expect(await mainPage.mainMenu.getProfileName()).toContain('xotifa2041@linxues.com');
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    test('add new transaction and find element by ID', async ({ loggedInPage, incomePage, page }) => {
        const [response] = await Promise.all([
            page.waitForResponse((resp) => resp.url().includes('/api/incomes/add') && resp.status() === 200),
            incomePage.addNewIncomeTransaction('2025-11-04', '1001') // <-- делаем запрос
        ]);

        const body = await response.json();
        const match = body.match(/Successfully created income ID: (.*)/);

        let incomeId: string | null = null;
        if (match && match[1]) {
            incomeId = match[1];
            console.log(`ID транзакції: ${incomeId}`);
        }

        if (incomeId) {
            const elementWithId = await page.locator(`#${incomeId}`);
            await expect(elementWithId).toBeVisible();
            console.log(`Элемент с ID #income-${incomeId} найден на странице.`);
        } else {
            console.log('Не удалось извлечь ID транзакции.');
            expect(true).toBe(false);
        }
    });
});
