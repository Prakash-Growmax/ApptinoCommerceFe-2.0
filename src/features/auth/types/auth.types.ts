export interface LoginCredentials {
  UserName: string;
  Password: string;
}

export interface User {
  id: number;
  email: string;
  displayName: string;
  picture: string | undefined;
  status: 'CONFIRMED' | 'PENDING' | 'INACTIVE';
  companyId: number;
  companyName: string;
  roleId: number;
  roleName: string;
}
