import { APIRequestContext, APIResponse } from '@playwright/test';
import 'dotenv/config';

export class ApiClient {
    private request: APIRequestContext;
    private baseUrl: string;

    public constructor(request: APIRequestContext) {
        this.request = request;
        const base = process.env.BASE_URL;
        if (!base) throw new Error('BASE_URL not set in .env');
        this.baseUrl = `${base}`;
    }

    private buildHeaders(token: string | null): Record<string, string> {
        return {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        };
    }

    public async get(endpoint: string, token: string | null): Promise<APIResponse> {
        return this.request.get(`${this.baseUrl}${endpoint}`, {
            headers: this.buildHeaders(token)
        });
    }

    public async post(endpoint: string, token: string | null, data: object): Promise<APIResponse> {
        return this.request.post(`${this.baseUrl}${endpoint}`, {
            headers: this.buildHeaders(token),
            data
        });
    }

    public async put(endpoint: string, token: string | null, data: object): Promise<APIResponse> {
        return this.request.put(`${this.baseUrl}${endpoint}`, {
            headers: this.buildHeaders(token),
            data
        });
    }

    public async delete(endpoint: string, token: string | null, data: object): Promise<APIResponse> {
        return this.request.delete(`${this.baseUrl}${endpoint}`, {
            headers: this.buildHeaders(token),
            data
        });
    }
}
