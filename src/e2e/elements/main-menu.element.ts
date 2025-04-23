import { Locator } from '@playwright/test';

export class MainMenu {
    private get homeElement(): Locator {
        return this.baseLocator.locator('li.nav-item:nth-child(1)');
    }

    private get registrationElement(): Locator {
        return this.baseLocator.locator('li.nav-item:nth-child(2)');
    }

    private get sighInElement(): Locator {
        return this.baseLocator.locator('li.nav-item:nth-child(3)');
    }

    public constructor(private baseLocator: Locator) {}

    public async goToLogin(): Promise<void> {
        await this.sighInElement.click();
    }

    public async getProfileName(): Promise<string | null> {
        const textContent = await this.registrationElement.textContent();
        return textContent;
    }
    public async clickOnLogout(): Promise<void> {
        await this.sighInElement.click();
    }
}
