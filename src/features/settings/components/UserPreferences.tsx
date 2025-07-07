import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShadCnButton as Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Sun, Settings } from "lucide-react";
import { FormSelect } from "@/components/molecules/ReactHookForm/FormSelect/FormSelect";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserPreferences, useUpdateUserPreferences } from "../hooks/useUserPreferences";
import { UserPreferencesFormData } from "../types/preferences.types";

// Simplified schema with only theme and accessibility
const preferencesSchema = z.object({
  theme: z.object({
    mode: z.enum(['light', 'dark', 'system']),
  }),
  accessibility: z.object({
    highContrast: z.boolean(),
    reducedMotion: z.boolean(),
    fontSize: z.enum(['small', 'medium', 'large']),
  }),
});

const fontSizeOptions = [
  { label: "Small", value: "small" },
  { label: "Medium", value: "medium" },
  { label: "Large", value: "large" },
];

const UserPreferences: React.FC = () => {
  const { data: preferences, isLoading } = useUserPreferences();
  const updatePreferences = useUpdateUserPreferences();

  const methods = useForm<UserPreferencesFormData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: preferences || {
      theme: { mode: 'system' },
      accessibility: {
        highContrast: false,
        reducedMotion: false,
        fontSize: 'medium',
      },
    },
  });

  const { handleSubmit, watch, setValue } = methods;
  const formValues = watch();

  React.useEffect(() => {
    if (preferences) {
      methods.reset(preferences);
    }
  }, [preferences, methods]);

  const onSubmit = async (data: UserPreferencesFormData) => {
    await updatePreferences.mutateAsync(data);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Theme Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="h-5 w-5" />
              Theme Preferences
            </CardTitle>
            <CardDescription>
              Customize the appearance of your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Enable dark theme for reduced eye strain
                </p>
              </div>
              <Switch
                id="dark-mode"
                checked={formValues.theme.mode === 'dark'}
                onCheckedChange={(checked) => 
                  setValue('theme.mode', checked ? 'dark' : 'light')
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Accessibility Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Accessibility
            </CardTitle>
            <CardDescription>
              Make the application easier to use
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="high-contrast">High Contrast Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Increase color contrast for better visibility
                </p>
              </div>
              <Switch
                id="high-contrast"
                checked={formValues.accessibility.highContrast}
                onCheckedChange={(checked) => 
                  setValue('accessibility.highContrast', checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="reduced-motion">Reduced Motion</Label>
                <p className="text-sm text-muted-foreground">
                  Minimize animations and transitions
                </p>
              </div>
              <Switch
                id="reduced-motion"
                checked={formValues.accessibility.reducedMotion}
                onCheckedChange={(checked) => 
                  setValue('accessibility.reducedMotion', checked)
                }
              />
            </div>

            <FormSelect
              name="accessibility.fontSize"
              label="Font Size"
              options={fontSizeOptions}
              placeholder="Select font size"
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={updatePreferences.isPending}>
            {updatePreferences.isPending ? "Saving..." : "Save Preferences"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default UserPreferences;