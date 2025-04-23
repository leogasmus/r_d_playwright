import { expect, Locator, Page } from '@playwright/test';

export class ExpensesPage {
    private get addNewButton(): Locator {
        return this.page.getByTitle('Додати витрати');
    }

    private get addDate(): Locator {
        return this.page.locator('input#Date-New');
    }

    private get addAmount(): Locator {
        return this.page.locator('#Expense-New');
    }

    private get submitTransaction(): Locator {
        return this.page.locator('#BtnAdd-New');
    }

    private get deleteTransactionButton(): Locator {
        return this.page.getByTitle('Видалити');
    }
    public get rowLocator(): Locator {
        return this.page.locator('tr.MuiTableRow-root');
    }

    public constructor(private page: Page) {}

    public async addNewTransaction(date: string, amount: string): Promise<void> {
        await this.addNewButton.click();
        await this.addDate.fill(date);
        await this.addAmount.fill(amount);
        await this.submitTransaction.click();
        await this.page.waitForTimeout(500);
    }

    public matchingRow(date: string, amount: string, currency: string): Locator {
        return this.rowLocator
            .filter({
                has: this.page.locator(`td:has-text("${date}")`)
            })
            .filter({
                has: this.page.locator(`td:has-text("${amount}")`)
            })
            .filter({
                has: this.page.locator(`td:has-text("${currency}")`)
            });
    }

    public async validateRowValues(id: string, expectedDate: string, expectedAmount: string, expectedCurrency: string): Promise<void> {
        const row = this.getRowById(id);

        const dateCell = row.locator(`td:nth-child(1)`);
        const amountCell = row.locator(`td:nth-child(2)`);
        const currencyCell = row.locator(`td:nth-child(3)`);

        await expect(dateCell).toHaveText(expectedDate);
        await expect(amountCell).toHaveText(expectedAmount);
        await expect(currencyCell).toHaveText(expectedCurrency);
    }

    public getRowById(id: string): Locator {
        return this.page.locator(`tr[id="${id}"]`);
    }
    public async deleteTransactionById(id: string): Promise<void> {
        const row = this.getRowById(id);
        const deleteButton = row.locator(`button[title="Видалити"]`);

        await expect(deleteButton).toBeVisible();
        await deleteButton.click();
        await this.page.waitForTimeout(2000);
    }
}
