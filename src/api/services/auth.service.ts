import { APIResponse } from '@playwright/test';
import { BaseService } from './base.service';
import { ApiClient } from 'api/client';

export class AuthService extends BaseService {
    public constructor(apiClient: ApiClient) {
        super(apiClient);
    }

    public async login(username: string, password: string): Promise<APIResponse> {
        return await this.apiClient.post('/api/react/Authenticate/login', null, {
            userName: username,
            password: password
        });
    }

    public async refreshToken(refreshToken: object): Promise<APIResponse> {
        return await this.apiClient.post('auth/refreshToken', null, {
            data: refreshToken
        });
    }

    public async loginAs(username: string, password: string): Promise<string> {
        const response = await this.apiClient.post('/api/react/Authenticate/login', null, {
            username: username,
            password: password
        });

        if (response.status() !== 200) {
            throw new Error(`Failed to authenticate: ${response.status()}`);
        }

        const responseBody = JSON.parse(await response.text());
        return responseBody.accessToken;
    }
}
