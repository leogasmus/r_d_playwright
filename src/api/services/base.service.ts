import { ApiClient } from 'api/client';
import { APIResponse } from '@playwright/test';

export class BaseService {
    protected apiClient: ApiClient;
    protected token: string | null;

    public constructor(apiClient: ApiClient, token: string | null = null) {
        this.apiClient = apiClient;
        this.token = token;
    }

    protected async get(endpoint: string): Promise<APIResponse> {
        return this.apiClient.get(endpoint, this.token);
    }

    protected async post(endpoint: string, data: object): Promise<APIResponse> {
        const res = await this.apiClient.post(endpoint, this.token, data);
        return res;
    }

    protected async put<T = unknown>(endpoint: string, data: object): Promise<T> {
        const res = await this.apiClient.put(endpoint, this.token, data);
        return res.json();
    }

    protected async delete(endpoint: string, data: object): Promise<APIResponse> {
        const res = await this.apiClient.delete(endpoint, this.token, data);
        return res;
    }
}
