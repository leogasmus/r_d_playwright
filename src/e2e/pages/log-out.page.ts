import { Locator, Page } from '@playwright/test';
import { MainMenu } from '../elements/main-menu.element';

export class LogoutPage {
    public mainMenu: MainMenu;

    public get mainHeader(): Locator {
        return this.page.locator('h3');
    }

    public get buttonTOLogin(): Locator {
        return this.page.locator('.btn');
    }

    public constructor(private page: Page) {
        this.mainMenu = new MainMenu(this.page.locator('.navbar-nav'));
    }
}
