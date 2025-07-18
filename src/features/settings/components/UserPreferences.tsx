  // import React, { useEffect } from "react";
  import { useForm, FormProvider } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { useMutation } from "@tanstack/react-query";
  import { z } from "zod";
  import { Loader2 } from "lucide-react";

  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { ShadCnButton as Button } from "@/components/ui/button";
  import { Label } from "@/components/ui/label";
  import { Switch } from "@/components/ui/switch";
  import { Sun, Settings } from "lucide-react"; 
  import { FormSelect } from "@/components/molecules/ReactHookForm/FormSelect/FormSelect";
  import { toast } from "sonner";
  import { useEffect } from "react";

  type UserPreferencesFormData = {
    theme: { mode: "light" | "dark" | "system" };
    accessibility: {
      highContrast: boolean;
      reducedMotion: boolean;
      fontSize: "small" | "medium" | "large";
    };
  };

  const preferencesSchema = z.object({
    theme: z.object({
      mode: z.enum(["light", "dark", "system"]),
    }),
    accessibility: z.object({
      highContrast: z.boolean(),
      reducedMotion: z.boolean(),
      fontSize: z.enum(["small", "medium", "large"]),
    }),
  });

  const fontSizeOptions = [
    { label: "Small", value: "small" },
    { label: "Medium", value: "medium" },
    { label: "Large", value: "large" },

  ];

  const defaultPreferences: UserPreferencesFormData = {
    theme: { mode: "light" }, // force light mode as default
    accessibility: {
      highContrast: false,
      reducedMotion: false,
      fontSize: "medium",
    },
  };


  function applyTheme(mode: "light" | "dark" | "system") {
    const root = document.documentElement;
    if (mode === "dark") {
      root.classList.add("dark");
    } else if (mode === "light") {
      root.classList.remove("dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", prefersDark);
    }
  }

  function applyAccessibility({
    highContrast,
    reducedMotion,
    fontSize,
  }: UserPreferencesFormData["accessibility"]) {
    const root = document.documentElement;
    root.classList.toggle("high-contrast", highContrast);
    root.classList.toggle("reduced-motion", reducedMotion);

    root.classList.remove("text-sm", "text-base", "text-lg");
    const sizeClass = {
      small: "text-sm",
      medium: "text-base",
      large: "text-lg",
    };
    root.classList.add(sizeClass[fontSize]);
  }

  // function getStoredPreferences(): UserPreferencesFormData {
  //   const stored = localStorage.getItem("userPreferences");
  //   if (stored) {
  //     try {
  //       const parsed = JSON.parse(stored);
  //       return {
  //         ...parsed,
  //         theme: { mode: "light" },

  //         accessibility: {
  //           highContrast: false,
  //           reducedMotion: false,
  //           fontSize: "medium",
  //         },
  //       };
  //     } catch {
  //       return defaultPreferences;
  //     }
  //   }
  //   return defaultPreferences;
  // }


  function getStoredPreferences(): UserPreferencesFormData {
    const stored = localStorage.getItem("userPreferences");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Ensure all expected fields are present, or fall back to default
        return {
          theme: {
            mode: parsed?.theme?.mode ?? defaultPreferences.theme.mode,
          },
          accessibility: {
            highContrast:
              parsed?.accessibility?.highContrast ?? defaultPreferences.accessibility.highContrast,
            reducedMotion:
              parsed?.accessibility?.reducedMotion ?? defaultPreferences.accessibility.reducedMotion,
            fontSize:
              parsed?.accessibility?.fontSize ?? defaultPreferences.accessibility.fontSize,
          },
        };
      } catch {
        return defaultPreferences;
      }
    }
    return defaultPreferences;
  }



    

  const UserPreferences: React.FC = () => {
    const storedPreferences = getStoredPreferences();

    const methods = useForm<UserPreferencesFormData>({
      resolver: zodResolver(preferencesSchema),
      defaultValues: storedPreferences,
    });

    const { handleSubmit, watch, setValue } = methods;
    const formValues = watch();

    useEffect(() => {
    applyTheme(storedPreferences.theme.mode);
    applyAccessibility(storedPreferences.accessibility);
  }, []);

      


    const updatePreferences = useMutation({
      mutationFn: async (data: UserPreferencesFormData) => {
        // Simulating save to localStorage (can be replaced with an API call)
        localStorage.setItem("userPreferences", JSON.stringify(data));
        applyTheme(data.theme.mode);
        applyAccessibility(data.accessibility);
      },
      onSuccess: () => {
        toast.success('Preferences saved!');
      },
    });

    const onSubmit = async (data: UserPreferencesFormData) => {
      await updatePreferences.mutateAsync(data);
    };


    return (
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Theme */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="h-5 w-5" />
                Theme Preferences
              </CardTitle>
              <CardDescription>Customize the appearance of your dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable dark theme for reduced eye strain
                  </p>
                </div>
                <Switch
                  id="dark-mode"
                  checked={formValues.theme.mode === "dark"}
                  onCheckedChange={(checked) =>
                    setValue("theme.mode", checked ? "dark" : "light")
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Accessibility */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Accessibility
              </CardTitle>
              <CardDescription>Make the application easier to use</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="contrast">High Contrast Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Increase color contrast for better visibility
                  </p>
                </div>
                <Switch
                  id="contrast"
                  checked={formValues.accessibility.highContrast}
                  onCheckedChange={(checked) =>
                    setValue("accessibility.highContrast", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="motion">Reduced Motion</Label>
                  <p className="text-sm text-muted-foreground">
                    Minimize animations and transitions
                  </p>
                </div>
                <Switch
                  id="motion"
                  checked={formValues.accessibility.reducedMotion}
                  onCheckedChange={(checked) =>
                    setValue("accessibility.reducedMotion", checked)
                  }
                />
              </div>

              <FormSelect
                name="accessibility.fontSize"
                label="Font Size"
                options={fontSizeOptions}
                placeholder="Select font size"
                className="text-black dark:text-black "

              />
            </CardContent>
          </Card>

          {/* Submit Button only */}
          <div className="flex justify-end">
            <Button type="submit" disabled={updatePreferences.isPending}>
              {updatePreferences.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Preferences"
              )}
            </Button>
          </div>

        </form>
      </FormProvider>
    );
  };

  export default UserPreferences;





































// import React from "react";
// import { useForm, FormProvider } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { ShadCnButton as Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
// import { Sun, Settings } from "lucide-react";
// import { FormSelect } from "@/components/molecules/ReactHookForm/FormSelect/FormSelect";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useUserPreferences, useUpdateUserPreferences } from "../hooks/useUserPreferences";
// import { UserPreferencesFormData } from "../types/preferences.types";

// // Simplified schema with only theme and accessibility
// const preferencesSchema = z.object({
//   theme: z.object({
//     mode: z.enum(['light', 'dark', 'system']),
//   }),
//   accessibility: z.object({
//     highContrast: z.boolean(),
//     reducedMotion: z.boolean(),
//     fontSize: z.enum(['small', 'medium', 'large']),
//   }),
// });

// const fontSizeOptions = [
//   { label: "Small", value: "small" },
//   { label: "Medium", value: "medium" },
//   { label: "Large", value: "large" },
// ];

// const UserPreferences: React.FC = () => {
//   const { data: preferences, isLoading } = useUserPreferences();
//   const updatePreferences = useUpdateUserPreferences();

//   const methods = useForm<UserPreferencesFormData>({
//     resolver: zodResolver(preferencesSchema),
//     defaultValues: preferences || {
//       theme: { mode: 'system' },
//       accessibility: {
//         highContrast: false,
//         reducedMotion: false,
//         fontSize: 'medium',
//       },
//     },
//   });

//   const { handleSubmit, watch, setValue } = methods;
//   const formValues = watch();

//   React.useEffect(() => {
//     if (preferences) {
//       methods.reset(preferences);
//     }
//   }, [preferences, methods]);

//   const onSubmit = async (data: UserPreferencesFormData) => {
//     await updatePreferences.mutateAsync(data);
//   };

//   if (isLoading) {
//     return (
//       <div className="space-y-6">
//         {[1, 2].map((i) => (
//           <Card key={i}>
//             <CardHeader>
//               <Skeleton className="h-5 w-32" />
//               <Skeleton className="h-4 w-48" />
//             </CardHeader>
//             <CardContent>
//               <Skeleton className="h-10 w-full" />
//               <Skeleton className="h-10 w-full" />
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     );
//   }

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         {/* Theme Preferences */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Sun className="h-5 w-5" />
//               Theme Preferences
//             </CardTitle>
//             <CardDescription>
//               Customize the appearance of your dashboard
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="flex items-center justify-between">
//               <div className="space-y-0.5">
//                 <Label htmlFor="dark-mode">Dark Mode</Label>
//                 <p className="text-sm text-muted-foreground">
//                   Enable dark theme for reduced eye strain
//                 </p>
//               </div>
//               <Switch
//                 id="dark-mode"
//                 checked={formValues.theme.mode === 'dark'}
//                 onCheckedChange={(checked) =>
//                   setValue('theme.mode', checked ? 'dark' : 'light')
//                 }
//               />
//             </div>
//           </CardContent>
//         </Card>

//         {/* Accessibility Settings */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Settings className="h-5 w-5" />
//               Accessibility
//             </CardTitle>
//             <CardDescription>
//               Make the application easier to use
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="flex items-center justify-between">
//               <div className="space-y-0.5">
//                 <Label htmlFor="high-contrast">High Contrast Mode</Label>
//                 <p className="text-sm text-muted-foreground">
//                   Increase color contrast for better visibility
//                 </p>
//               </div>
//               <Switch
//                 id="high-contrast"
//                 checked={formValues.accessibility.highContrast}
//                 onCheckedChange={(checked) =>
//                   setValue('accessibility.highContrast', checked)
//                 }
//               />
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="space-y-0.5">
//                 <Label htmlFor="reduced-motion">Reduced Motion</Label>
//                 <p className="text-sm text-muted-foreground">
//                   Minimize animations and transitions
//                 </p>
//               </div>
//               <Switch
//                 id="reduced-motion"
//                 checked={formValues.accessibility.reducedMotion}
//                 onCheckedChange={(checked) =>
//                   setValue('accessibility.reducedMotion', checked)
//                 }
//               />
//             </div>

//             <FormSelect
//               name="accessibility.fontSize"
//               label="Font Size"
//               options={fontSizeOptions}
//               placeholder="Select font size"
//             />
//           </CardContent>
//         </Card>

//         <div className="flex justify-end">
//           <Button type="submit" disabled={updatePreferences.isPending}>
//             {updatePreferences.isPending ? "Saving..." : "Save Preferences"}
//           </Button>
//         </div>
//       </form>
//     </FormProvider>
//   );
// };

// export default UserPreferences;


