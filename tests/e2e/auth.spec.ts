import { expect } from '@playwright/test';
import { test } from 'e2e/fixture/page.fixture';
import 'dotenv/config';

test.describe('User can', () => {
    test('log in via email and password', async ({ mainPage, loginPage }) => {
        await mainPage.goto();
        await mainPage.goToLogin();
        await loginPage.fillLogInForm(`${process.env.EMAIL}`, `${process.env.PASSWORD}`);
        await expect(await mainPage.mainMenu.getProfileName()).toContain(`${process.env.EMAIL}`);
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    test('log out from account', async ({ loggedInPage, mainPage, logoutPage }) => {
        await mainPage.mainMenu.clickOnLogout();
        await expect(logoutPage.mainHeader).toContainText('Користувач успішно покинув систему');
        await expect(logoutPage.buttonTOLogin).toContainText('Увійти знову');
    });
});
