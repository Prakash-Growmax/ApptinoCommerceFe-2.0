import { describe, it, expect, beforeEach } from 'vitest';
import { server } from '@/test/mocks/server';
import { http, HttpResponse } from 'msw';
import { authApi } from '../authApi';

describe('Auth API', () => {
  beforeEach(() => {
    localStorage.clear();
    server.resetHandlers();
  });

  it('should login successfully', async () => {
    server.use(
      http.post('/api/auth/login', (req) => {
        return HttpResponse.json({
          success: true,
          data: {
            token: 'jwt-token',
            user: { id: 1, email: 'test@example.com' },
          },
        });
      })
    );

    const response = await authApi.login({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(response.success).toBe(true);
    expect(response.data.token).toBe('jwt-token');
    expect(localStorage.getItem('token')).toBe('jwt-token');
  });

  it('should handle login failure', async () => {
    server.use(
      http.post('/api/auth/login', () => {
        return HttpResponse.json(
          {
            success: false,
            message: 'Invalid credentials',
          },
          { status: 401 }
        );
      })
    );

    await expect(
      authApi.login({
        email: 'wrong@example.com',
        password: 'wrongpassword',
      })
    ).rejects.toThrow('Invalid credentials');
  });

  it('should refresh token', async () => {
    localStorage.setItem('token', 'old-token');

    server.use(
      http.post('/api/auth/refresh', () => {
        return HttpResponse.json({
          success: true,
          data: { token: 'new-token' },
        });
      })
    );

    const response = await authApi.refreshToken();
    expect(response.data.token).toBe('new-token');
    expect(localStorage.getItem('token')).toBe('new-token');
  });

  it('should logout and clear token', async () => {
    localStorage.setItem('token', 'test-token');

    server.use(
      http.post('/api/auth/logout', () => {
        return HttpResponse.json({ success: true });
      })
    );

    await authApi.logout();
    expect(localStorage.getItem('token')).toBeNull();
  });
});
