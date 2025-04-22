import { test as base } from './base.fixture';
import { MainPage } from 'e2e/pages/main.page';
import { LoginPage } from 'e2e/pages/log-in.page';
import { IncomePage } from 'e2e/pages/income.page';
import { Page } from '@playwright/test';

export const test = base.extend<{
    mainPage: MainPage;
    loginPage: LoginPage;
    incomePage: IncomePage;
    loggedInPage: Page;
}>({
    mainPage: async ({ page }, use) => {
        const mainPage = new MainPage(page);
        await use(mainPage);
    },
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    incomePage: async ({ page }, use) => {
        const incomePage = new IncomePage(page);
        await use(incomePage);
    },
    loggedInPage: async ({ page, mainPage, loginPage }, use) => {
        await mainPage.goto();
        await mainPage.goToLogin();
        await loginPage.fillLogInForm('xotifa2041@linxues.com', "9#'d=buSWS-9BPp");
        await page.waitForTimeout(500);
        await use(page);
    }
});
