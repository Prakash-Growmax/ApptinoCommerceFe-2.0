import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { preferencesApi } from "../api/preferences.api";
import { UserPreferences, UpdatePreferencesPayload } from "../types/preferences.types";
import { toast } from "sonner";
import usePreferencesStore from "../stores/usePreferencesStore";

const PREFERENCES_QUERY_KEY = ["user", "preferences"];

export const useUserPreferences = () => {
  return useQuery({
    queryKey: PREFERENCES_QUERY_KEY,
    queryFn: async () => {
      const response = await preferencesApi.getUserPreferences();
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

export const useUpdateUserPreferences = () => {
  const queryClient = useQueryClient();
  const { setPreferences } = usePreferencesStore();

  return useMutation({
    mutationFn: async (payload: UpdatePreferencesPayload) => {
      const response = await preferencesApi.updateUserPreferences(payload);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData<UserPreferences>(PREFERENCES_QUERY_KEY, data);
      toast.success("Preferences updated successfully");
      
      // Update the store which will also apply the preferences
      setPreferences(data);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update preferences");
    },
  });
};

export const useResetUserPreferences = () => {
  const queryClient = useQueryClient();
  const { setPreferences } = usePreferencesStore();

  return useMutation({
    mutationFn: async () => {
      const response = await preferencesApi.resetPreferences();
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData<UserPreferences>(PREFERENCES_QUERY_KEY, data);
      toast.success("Preferences reset to defaults");
      
      // Update the store which will also apply the preferences
      setPreferences(data);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to reset preferences");
    },
  });
};