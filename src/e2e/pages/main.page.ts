import { Locator, Page } from '@playwright/test';
import { MainMenu } from 'e2e/elements/main-menu.element';

export class MainPage {
    public mainMenu: MainMenu;

    private get mainHeader(): Locator {
        return this.page.getByText('Вітаю!');
    }

    public constructor(private page: Page) {
        this.mainMenu = new MainMenu(this.page.locator('.navbar-nav'));
    }
    public async goto(): Promise<void> {
        await this.page.goto('https://new.fophelp.pro/');
        await this.mainHeader.waitFor();
    }

    public async goToLogin(): Promise<void> {
        await this.mainMenu.goToLogin();
    }
}
