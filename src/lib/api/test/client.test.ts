import { rest } from 'msw';
import { server } from '@/test/mocks/server';
import { apiClient } from '../client';

describe('API Client', () => {
  it('should add authorization header for authenticated requests', async () => {
    localStorage.setItem('token', 'test-token');

    server.use(
      rest.get('/api/test', (req, res, ctx) => {
        const authHeader = req.headers.get('Authorization');
        return res(ctx.json({ 
          hasAuth: authHeader === 'Bearer test-token' 
        }));
      })
    );

    const response = await apiClient.get('/api/test');
    expect(response.data.hasAuth).toBe(true);
  });

  it('should handle 401 unauthorized errors', async () => {
    server.use(
      rest.get('/api/protected', (req, res, ctx) => {
        return res(ctx.status(401), ctx.json({
          message: 'Unauthorized'
        }));
      })
    );

    await expect(apiClient.get('/api/protected')).rejects.toThrow('Unauthorized');
  });

  it('should handle network errors', async () => {
    server.use(
      rest.get('/api/test', (req, res, ctx) => {
        return res.networkError('Network error');
      })
    );

    await expect(apiClient.get('/api/test')).rejects.toThrow();
  });

  it('should retry failed requests', async () => {
    let callCount = 0;
    server.use(
      rest.get('/api/retry-test', (req, res, ctx) => {
        callCount++;
        if (callCount === 1) {
          return res(ctx.status(500));
        }
        return res(ctx.json({ success: true }));
      })
    );

    const response = await apiClient.get('/api/retry-test');
    expect(response.data.success).toBe(true);
    expect(callCount).toBe(2);
  });
});