import { test as baseTest } from '@playwright/test';
import { ApiClient } from 'api/client';
import { AuthService } from 'api/services/auth.service';
import { IncomesService } from 'api/services/income.service';

interface AuthFixtures {
    apiClient: ApiClient;
    token: string;
    incomeService: IncomesService;
}

export const test = baseTest.extend<AuthFixtures>({
    apiClient: async ({ request }, use) => {
        const client = new ApiClient(request);
        await use(client);
    },

    token: async ({ apiClient }, use) => {
        const authService = new AuthService(apiClient);
        const username = process.env.EMAIL!;
        const password = process.env.PASSWORD!;
        const token = await authService.loginAs(username, password);
        await use(token);
    },
    incomeService: async ({ apiClient, token }, use) => {
        const incomesService = new IncomesService(apiClient, token);
        await use(incomesService);
    }
});
