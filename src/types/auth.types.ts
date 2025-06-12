import { Currency } from './general.types';

export interface AuthActions {
  loginAction: (
    accessToken: string,
    refreshToken: string,
    payload: TokenPayload
  ) => void;
  logoutAction: () => void;
  setAppLoadingAction: (loading: boolean) => void;
  setAuthLoadingAction: (loading: boolean) => void;
  setErrorAction: (error: boolean) => void;
  getAuthHeaderAction: () => { Authorization?: string };
  initializeAuthAction: () => void;
  isTokenValidAction: () => boolean;
  refreshTokensAction: (
    newAccessToken: string,
    newRefreshToken: string
  ) => void;
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
  isAuthLoading: boolean;
  isError: boolean;
}
