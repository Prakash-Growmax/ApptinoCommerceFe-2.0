export interface UserPreferences {
  theme: {
    mode: 'light' | 'dark' | 'system';
  };
  accessibility: {
    highContrast: boolean;
    reducedMotion: boolean;
    fontSize: 'small' | 'medium' | 'large';
  };
}

export interface UpdatePreferencesPayload {
  preferences: Partial<UserPreferences>;
}

export interface PreferencesResponse {
  data: UserPreferences;
  message: string;
}

export type UserPreferencesFormData = UserPreferences;