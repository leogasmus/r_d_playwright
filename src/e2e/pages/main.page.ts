import { Locator, Page } from '@playwright/test';
import { MainMenu } from 'e2e/elements/main-menu.element';
import { SideMenu } from 'e2e/elements/side-menu.element';

export class MainPage {
    public mainMenu: MainMenu;
    public sideMenu: SideMenu;

    private get mainHeader(): Locator {
        return this.page.getByText('Вітаю!');
    }

    public constructor(private page: Page) {
        this.mainMenu = new MainMenu(this.page.locator('.navbar-nav'));
        this.sideMenu = new SideMenu(this.page.getByRole('navigation'));
    }
    public async goto(): Promise<void> {
        await this.page.goto('https://new.fophelp.pro/');
        await this.mainHeader.waitFor();
    }

    public async goToLogin(): Promise<void> {
        await this.mainMenu.goToLogin();
    }

    public async goToExpensesPage(): Promise<void> {
        await this.sideMenu.expensesCategory.click();
    }
}
