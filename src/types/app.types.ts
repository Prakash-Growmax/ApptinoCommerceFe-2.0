import { AuthActions, AuthState } from './auth.types';

interface AppState {
  isAppLoading: boolean;
  hasHydrated: boolean;
}

interface AppActions {
  setAppLoadingAction: (loading: boolean) => void;
  setHydrated: () => void;
}

export interface AppStore
  extends AppState,
    AppActions,
    AuthState,
    AuthActions {}
