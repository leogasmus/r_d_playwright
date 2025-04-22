import { Locator, Page } from '@playwright/test';
import { MainMenu } from '../elements/main-menu.element';

export class LoginPage {
    public mainMenu: MainMenu;

    private get emailInput(): Locator {
        return this.page.locator('#email');
    }

    private get passwordInput(): Locator {
        return this.page.locator('#password');
    }
    private get submitButton(): Locator {
        return this.page.getByRole('button', { name: 'Увійти' });
    }

    public constructor(private page: Page) {
        this.mainMenu = new MainMenu(this.page.locator('.navbar-nav'));
    }

    public async fillLogInForm(email: string, password: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
        await this.page.waitForTimeout(500);
    }
}
