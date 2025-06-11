import { AuthActions, AuthState } from './auth.types';

interface AppState {
  isAppLoading: boolean;
}

interface AppActions {
  setAppLoadingAction: (loading: boolean) => void;
}

export interface AppStore
  extends AppState,
    AppActions,
    AuthState,
    AuthActions {}
