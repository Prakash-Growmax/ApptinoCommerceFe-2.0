

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
  // if (tenantId) headers['X-TENANT-ID'] = tenantId; 

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


// import axios, { AxiosRequestConfig } from 'axios';

// export interface ApiError {
//   message: string;
//   status: number;
// }

// export const apiPost = async <T>({
//   url,
//   data,
//   token,
//   tenantId,
//   config = {},
// }: {
//   url: string;
//   data?: unknown;
//   token?: string;
//   tenantId?: string;
//   config?: AxiosRequestConfig;
// }): Promise<T> => {
//   try {
//     const headers: Record<string, string> = {
//       'Content-Type': 'application/json',
//       ...(token && { Authorization: `Bearer ${token}` }),
//       ...(tenantId && { 'x-tenant': tenantId }),
//       ...(config.headers || {}),
//     };

//     const response = await axios.post(`https://api.myapptino.com${url}`, data, {
//       ...config,
//       headers,
//     });

//     return response.data as T;
//   } catch (error: any) {
//     if (axios.isAxiosError(error)) {
//       throw {
//         message: error.response?.data?.message || 'API call failed',
//         status: error.response?.status || 500,
//       } satisfies ApiError;
//     }

//     throw {
//       message: error.message || 'Unexpected error',
//       status: 500,
//     } satisfies ApiError;
//   }
// };




// export const apiPostt = async <T>({ url, data, token, tenantId }: ApiPostArgs<T>): Promise<T> => {
//   const headers: Record<string, string> = {
//     'Content-Type': 'application/json',
//   };

//   if (token) headers['Authorization'] = `Bearer ${token}`;
//   if (tenantId) headers['x-tenant'] = tenantId;

//   const response = await fetch(`https://api.myapptino.com${url}`, {
//     method: 'POST',
//     headers,
//     body: JSON.stringify(data),
//   });

//   const result = await response.json();

//   if (!response.ok) {
//     throw new Error(result?.message || 'API call failed');
//   }

//   return result as T;
// };
