export interface LoginCredentials {
  username: string;
  password: string;
  // Add other fields as needed
}

export interface User {
  id: string;
  username: string;
  email?: string;
  // Add other user fields as needed
}
