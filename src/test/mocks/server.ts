import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

const handlers = [
  // User preferences endpoints
  // Change this:
http.put('*/user/preferences', () => {
  return HttpResponse.json({
    success: true,
    message: 'Preferences updated successfully',
  });
}),

// To this:
http.put('*/api/user/preferences', () => {
  return HttpResponse.json({
    success: true,
    message: 'Preferences updated successfully',
    data: {
      theme: 'dark',
      language: 'en',
      notifications: true,
      dateFormat: 'MM/DD/YYYY'
    }
  });
}),

  // Support tickets endpoints - default handlers
  http.get('*/api/support/tickets', () => {
    return HttpResponse.json({
      success: true,
      data: [],
      total: 0,
      pagination: {
        page: 1,
        limit: 20,
        total: 0,
      },
    });
  }),

  http.post('*/api/support/tickets', () => {
    return HttpResponse.json({
      success: true,
      data: {
        id: Math.floor(Math.random() * 1000),
        status: 'open',
        createdAt: new Date().toISOString(),
      },
    });
  }),

  http.get('*/api/support/tickets/:id', ({ params }) => {
    return HttpResponse.json({
      success: true,
      data: {
        id: parseInt(params.id as string),
        title: 'Sample Ticket',
        status: 'open',
        description: 'Sample description',
      },
    });
  }),

  http.patch('*/api/support/tickets/:id', ({ params }) => {
    return HttpResponse.json({
      success: true,
      data: {
        id: parseInt(params.id as string),
        updatedAt: new Date().toISOString(),
      },
    });
  }),

  http.delete('*/api/support/tickets/:id', ({ params }) => {
    return HttpResponse.json({
      success: true,
      data: {
        id: parseInt(params.id as string),
      },
    });
  }),

  // Customer endpoints
  http.get('*/api/customers', ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search');

    return HttpResponse.json({
      success: true,
      data: search ? [] : [],
      total: 0,
    });
  }),

  http.post('*/api/customers', () => {
    return HttpResponse.json({
      success: true,
      data: {
        id: Math.floor(Math.random() * 1000),
        createdAt: new Date().toISOString(),
      },
    });
  }),

  http.get('*/api/customers/:id', ({ params }) => {
    return HttpResponse.json({
      success: true,
      data: {
        id: parseInt(params.id as string),
        name: 'Sample Customer',
        email: 'sample@example.com',
      },
    });
  }),

  http.put('*/api/customers/:id', ({ params }) => {
    return HttpResponse.json({
      success: true,
      data: {
        id: parseInt(params.id as string),
        updatedAt: new Date().toISOString(),
      },
    });
  }),

  http.delete('*/api/customers/:id', () => {
    return HttpResponse.json({
      success: true,
      message: 'Customer deleted successfully',
    });
  }),

  // Auth API handlers
  http.post('*/api/auth/login', ({ json }) => {
    const { email, password } = json as { email: string; password: string };
    if (email === 'test@example.com' && password === 'password123') {
      return HttpResponse.json({
        success: true,
        data: {
          token: 'jwt-token',
          user: { id: 1, email },
        },
      });
    }
    return HttpResponse.json(
      {
        success: false,
        message: 'Invalid credentials',
      },
      { status: 401 }
    );
  }),

  http.post('*/api/auth/refresh', () => {
    return HttpResponse.json({
      success: true,
      data: { token: 'new-token' },
    });
  }),

  http.post('*/api/auth/logout', () => {
    return HttpResponse.json({
      success: true,
    });
  }),
];

export const server = setupServer(...handlers);
export { handlers };
