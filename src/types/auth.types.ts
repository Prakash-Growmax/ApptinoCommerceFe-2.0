import { Currency } from './general.types';

export interface AuthActions {
  setAuth: (
    payload: TokenPayload,
    accessToken: string,
    refreshToken: string
  ) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export interface TokenPayload {
  companyId: number;
  companyLogo: string;
  companyName: string;
  currency: Currency;
  dateFormat: string;
  elasticCode: string;
  roleId: number;
  roleName: string;
  roundOff: string;
  taxExempted: boolean;
  tenantId: string;
  timeFormat: string;
  timeZone: string;
  userId: number;
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
  roleid: number;
  status: string;
  displayName: string;
  notification_id: number;
  isSeller: boolean;
  secondaryEmail: string;
  secondaryPhoneNumber: string;
  picture: string;
  phoneNumberVerified: boolean;
  id: string;
  sub: string;
  iss: string;
  aud: string;
  allowAutoRegsiter: boolean;
  isSmsConfigured: boolean;
  type: string;
  iat: number;
  exp: number;
}

export interface AuthState {
  payload: TokenPayload | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
  payload: TokenPayload;
}
