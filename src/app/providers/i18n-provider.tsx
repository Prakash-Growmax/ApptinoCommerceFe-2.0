import i18n from "@config/i18n";
import { ReactNode, useEffect } from "react";
import { I18nextProvider } from "react-i18next";

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider = ({ children }: I18nProviderProps) => {
  useEffect(() => {
    // Load initial language
    const userLanguage =
      localStorage.getItem("userLanguage") || navigator.language;
    void i18n.changeLanguage(userLanguage);
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
