import { test as base } from './base.fixture';
import { MainPage } from 'e2e/pages/main.page';
import { LoginPage } from 'e2e/pages/log-in.page';
import { IncomePage } from 'e2e/pages/income.page';
import { Page } from '@playwright/test';
import { ExpensesPage } from 'e2e/pages/expenses.page';
import { LogoutPage } from 'e2e/pages/log-out.page';
import { IncomesService } from 'api/services/income.service';
import { ExpenseService } from 'api/services/expense.service';
import { ApiClient } from 'api/client';
import { AuthService } from 'api/services/auth.service';
import 'dotenv/config';

export const test = base.extend<{
    mainPage: MainPage;
    loginPage: LoginPage;
    logoutPage: LogoutPage;
    incomePage: IncomePage;
    expensesPage: ExpensesPage;
    loggedInPage: Page;
    incomeService: IncomesService;
    expenseService: ExpenseService;
}>({
    mainPage: async ({ page }, use) => {
        const mainPage = new MainPage(page);
        await use(mainPage);
    },
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    logoutPage: async ({ page }, use) => {
        const logoutPage = new LogoutPage(page);
        await use(logoutPage);
    },
    incomePage: async ({ page }, use) => {
        const incomePage = new IncomePage(page);
        await use(incomePage);
    },
    expensesPage: async ({ page }, use) => {
        const expensesPage = new ExpensesPage(page);
        await use(expensesPage);
    },
    loggedInPage: async ({ page, mainPage, loginPage }, use) => {
        await mainPage.goto();
        await mainPage.goToLogin();
        await loginPage.fillLogInForm(`${process.env.EMAIL}`, `${process.env.PASSWORD}`);
        await page.waitForTimeout(500);
        await use(page);
    },
    incomeService: async ({ request }, use) => {
        const client = new ApiClient(request);
        const authService = new AuthService(client);
        const token = await authService.loginAs(process.env.EMAIL!, process.env.PASSWORD!);
        const service = new IncomesService(client, token);
        await use(service);
    },

    expenseService: async ({ request }, use) => {
        const client = new ApiClient(request);
        const authService = new AuthService(client);
        const token = await authService.loginAs(process.env.EMAIL!, process.env.PASSWORD!);
        const service = new ExpenseService(client, token);
        await use(service);
    }
});
