type UserPreferencesFormData = {
  theme: { mode: "light" | "dark" | "system" };
  accessibility: {
    highContrast: boolean;
    reducedMotion: boolean;
    fontSize: "small" | "medium" | "large";
  };
};      

const defaultPreferences: UserPreferencesFormData = {
  theme: { mode: "light" },
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

export function loadUserPreferences() {
  try {
    const stored = localStorage.getItem("userPreferences");
    const parsed = stored ? JSON.parse(stored) : null;

    const preferences: UserPreferencesFormData = {
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

    applyTheme(preferences.theme.mode);
    applyAccessibility(preferences.accessibility);
  } catch {
    applyTheme(defaultPreferences.theme.mode);
    applyAccessibility(defaultPreferences.accessibility);
  }
}
