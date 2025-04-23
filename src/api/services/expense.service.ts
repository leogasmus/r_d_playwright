import { APIResponse } from '@playwright/test';
import { BaseService } from 'api/services/base.service';

export class ExpenseService extends BaseService {
    public async getExpenses(): Promise<ExpenseResponse> {
        const response: APIResponse = await this.get('/api/expenses');
        // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        const responseBody = (await response.json()) as ExpenseResponse | {};
        return responseBody;
    }

    public async createExpense(data: ExpenseItem): Promise<string> {
        const response = this.post('/api/expenses/add', data);
        return (await response).text();
    }

    public async updateExpense(data: ExpenseItem): Promise<string> {
        const response = this.post('/api/expenses/update', data);
        return (await response).text();
    }

    public async deleteExpense(data: ExpenseItem): Promise<string> {
        const response = this.post('/api/expenses/delete', data);
        return (await response).text();
    }
}
