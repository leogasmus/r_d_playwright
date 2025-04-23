import { Locator } from '@playwright/test';

export class SideMenu {
    public get incomeCategory(): Locator {
        return this.baseLocator.locator('text=Прибуток');
    }

    public get expensesCategory(): Locator {
        return this.baseLocator.locator('text=Витрати');
    }

    public get taxesCategory(): Locator {
        return this.baseLocator.locator('text=Податки');
    }

    public constructor(private baseLocator: Locator) {}
}
