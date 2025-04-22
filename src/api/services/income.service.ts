import { APIResponse } from '@playwright/test';
import { BaseService } from 'api/services/base.service';

export class IncomesService extends BaseService {
    public async getIncomes(): Promise<IncomesResponse> {
        const response: APIResponse = await this.get('/api/incomes');
        // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        const responseBody = (await response.json()) as IncomesResponse | {};
        return responseBody;
    }

    public async createIncome(data: IncomeItem): Promise<string> {
        const response = this.post('/api/incomes/add', data);
        return (await response).text();
    }

    public async updateIncome(data: IncomeItem): Promise<string> {
        const response = this.post('/api/incomes/update', data);
        return (await response).text();
    }

    public async deleteIncome(data: IncomeItem): Promise<string> {
        const response = this.post('/api/incomes/delete', data);
        return (await response).text();
    }
}
