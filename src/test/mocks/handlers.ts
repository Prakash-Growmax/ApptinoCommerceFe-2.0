// src/test/mocks/handlers.ts
import { HttpResponse, http } from 'msw';

// Define types for your API
interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

interface CreateUserRequest {
  name: string;
  email: string;
}

interface UpdateUserRequest {
  name?: string;
  email?: string;
}

// Define your API mocks here
export const handlers = [
  // Example GET request handler
  http.get('*/api/users', () => {
    return HttpResponse.json<User[]>([
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
      },
    ]);
  }),

  // Example POST request handler
  http.post('*/api/users', async ({ request }) => {
    const { name, email } = (await request.json()) as CreateUserRequest;

    return HttpResponse.json<User>(
      {
        id: '3',
        name,
        email,
        createdAt: new Date().toISOString(),
      },
      { status: 201 }
    );
  }),

  // Example PUT request handler
  http.put('*/api/users/:id', async ({ params, request }) => {
    const { id } = params;
    const updates = (await request.json()) as UpdateUserRequest;

    return HttpResponse.json<User>({
      id: id as string,
      name: 'Updated Name', // You'd typically fetch the existing user first
      email: 'updated@example.com',
      ...updates,
      updatedAt: new Date().toISOString(),
    });
  }),

  // Example DELETE request handler
  http.delete('*/api/users/:id', ({ params }) => {
    const { id } = params;

    return HttpResponse.json({
      id: id as string,
      deleted: true,
    });
  }),

  // Auth handlers
  http.post('*/auth/login', async ({ request }) => {
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };

    // Mock authentication logic
    if (email === 'test@example.com' && password === 'password') {
      return HttpResponse.json({
        user: {
          id: '1',
          email: 'test@example.com',
          name: 'Test User',
          role: 'user',
        },
        token: 'mock-jwt-token',
        refreshToken: 'mock-refresh-token',
      });
    }

    return HttpResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    );
  }),

  http.post('*/auth/register', async ({ request }) => {
    const userData = (await request.json()) as {
      name: string;
      email: string;
      password: string;
    };

    return HttpResponse.json(
      {
        user: {
          id: '2',
          email: userData.email,
          name: userData.name,
          role: 'user',
        },
        token: 'mock-jwt-token',
        refreshToken: 'mock-refresh-token',
      },
      { status: 201 }
    );
  }),

  http.get('*/auth/me', ({ request }) => {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return HttpResponse.json({
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'user',
    });
  }),

  http.delete('*/auth/logout', () => {
    return HttpResponse.json({ message: 'Logged out successfully' });
  }),

  // Add more handlers as needed
];
