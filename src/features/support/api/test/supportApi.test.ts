// src/features/support/api/test/supportApi.test.ts
import { http, HttpResponse } from 'msw';
import { server } from '@/test/mocks/server';
import { supportApi } from '../support.api'; // ✅


// Setup and teardown for MSW
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Support API', () => {
  it('should fetch support tickets successfully', async () => {
    const mockTickets = [
      { id: 1, title: 'Test Ticket', status: 'open' as const },
      { id: 2, title: 'Another Ticket', status: 'closed' as const }
    ];

    server.use(
      http.get('/api/support/tickets', () => {
        return HttpResponse.json({
          success: true,
          data: mockTickets,
          total: 2
        });
      })
    );

    const response = await supportApi.getTickets();
    expect(response.success).toBe(true);
    expect(response.data).toEqual(mockTickets);
    expect(response.total).toBe(2);
  });

  it('should handle pagination parameters', async () => {
    server.use(
      http.get('/api/support/tickets', ({ request }) => {
        const url = new URL(request.url);
        const page = url.searchParams.get('page');
        const limit = url.searchParams.get('limit');
        
        return HttpResponse.json({
          success: true,
          data: [],
          pagination: { 
            page: parseInt(page || '1'), 
            limit: parseInt(limit || '20') 
          }
        });
      })
    );

    const response = await supportApi.getTickets({ page: 2, limit: 10 });
    expect(response.pagination?.page).toBe(2);
    expect(response.pagination?.limit).toBe(10);
  });

  it('should create new support ticket', async () => {
    const newTicket = {
      title: 'New Issue',
      description: 'Ticket description',
      priority: 'high' as const
    };

    server.use(
      http.post('/api/support/tickets', async ({ request }) => {
        const body = await request.json();
        return HttpResponse.json({
          success: true,
          data: { id: 3, ...body, status: 'open' }
        });
      })
    );

    const response = await supportApi.createTicket(newTicket);
    expect(response.success).toBe(true);
    expect(response.data.title).toBe('New Issue');
    expect(response.data.id).toBe(3);
  });

  it('should update ticket status', async () => {
    server.use(
      http.patch('/api/support/tickets/1', async ({ request }) => {
        const body = await request.json() as { status: string };
        return HttpResponse.json({
          success: true,
          data: { id: 1, status: body.status, title: 'Test Ticket' }
        });
      })
    );

    const response = await supportApi.updateTicketStatus(1, 'resolved');
    expect(response.success).toBe(true);
    expect(response.data.status).toBe('resolved');
    expect(response.data.id).toBe(1);
  });

  it('should handle API errors gracefully', async () => {
    server.use(
      http.get('/api/support/tickets', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    await expect(supportApi.getTickets()).rejects.toThrow('Failed to fetch tickets');
  });

  it('should get ticket by ID', async () => {
    const mockTicket = { 
      id: 1, 
      title: 'Test Ticket', 
      status: 'open' as const,
      description: 'Test description'
    };

    server.use(
      http.get('/api/support/tickets/1', () => {
        return HttpResponse.json({
          success: true,
          data: mockTicket
        });
      })
    );

    const response = await supportApi.getTicketById(1);
    expect(response.success).toBe(true);
    expect(response.data).toEqual(mockTicket);
  });
});