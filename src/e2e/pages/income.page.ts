import { Locator, Page } from '@playwright/test';

export class IncomePage {
    private get addNewIncomeButton(): Locator {
        return this.page.getByTitle('Додати новий дохід');
    }

    private get addDateForIncome(): Locator {
        return this.page.locator('input#Date-New');
    }

    private get addNewAmount(): Locator {
        return this.page.locator('#Income-New');
    }

    private get submitNewIncome(): Locator {
        return this.page.locator('#BtnAdd-New');
    }

    private get deleteTransactionButton(): Locator {
        return this.page.getByTitle('Видалити');
    }

    public constructor(private page: Page) {}

    public async addNewIncomeTransaction(date: string, amount: string): Promise<void> {
        await this.addNewIncomeButton.click();
        await this.addDateForIncome.fill(date);
        await this.addNewAmount.fill(amount);
        await this.submitNewIncome.click();
        await this.page.waitForTimeout(500);
    }
}
