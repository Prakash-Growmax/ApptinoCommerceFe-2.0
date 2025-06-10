// src/lib/api/client.ts

type ApiPostArgs<T> = {
  url: string;
  data?: unknown;
  token?: string;
  tenantId?: string;
};

export const apiPost = async <T>({
  url,
  data,
  token,
  tenantId,
}: ApiPostArgs<T>): Promise<T> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) headers['Authorization'] = `Bearer ${token}`;
  if (tenantId) headers['x-tenant'] = tenantId;

  const response = await fetch(`https://api.myapptino.com${url}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || 'API call failed');
  }

  return result as T;
};
