import { apiClient } from "@/lib/api/client";
import { ApiResponse } from "@/types/api";
import { UserPreferences, UpdatePreferencesPayload, PreferencesResponse } from "../types/preferences.types";

const PREFERENCES_API_PATH = "/user/preferences";

export const preferencesApi = {
  // Get user preferences
  getUserPreferences: async (): Promise<ApiResponse<UserPreferences>> => {
    try {
      const response = await apiClient.get<PreferencesResponse>(PREFERENCES_API_PATH);
      return {
        success: true,
        data: response.data.data,
        message: response.data.message || "Preferences fetched successfully",
      };
    } catch (error: any) {
      return {
        success: false,
        data: {} as UserPreferences,
        message: error.response?.data?.message || "Failed to fetch preferences",
        error: error.response?.data,
      };
    }
  },

  // Update user preferences
  updateUserPreferences: async (
    payload: UpdatePreferencesPayload
  ): Promise<ApiResponse<UserPreferences>> => {
    try {
      const response = await apiClient.put<PreferencesResponse>(
        PREFERENCES_API_PATH,
        payload
      );
      return {
        success: true,
        data: response.data.data,
        message: response.data.message || "Preferences updated successfully",
      };
    } catch (error: any) {
      return {
        success: false,
        data: {} as UserPreferences,
        message: error.response?.data?.message || "Failed to update preferences",
        error: error.response?.data,
      };
    }
  },

  // Reset preferences to default
  resetPreferences: async (): Promise<ApiResponse<UserPreferences>> => {
    try {
      const response = await apiClient.post<PreferencesResponse>(
        `${PREFERENCES_API_PATH}/reset`
      );
      return {
        success: true,
        data: response.data.data,
        message: response.data.message || "Preferences reset successfully",
      };
    } catch (error: any) {
      return {
        success: false,
        data: {} as UserPreferences,
        message: error.response?.data?.message || "Failed to reset preferences",
        error: error.response?.data,
      };
    }
  },
};