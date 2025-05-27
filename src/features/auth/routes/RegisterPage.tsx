import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@components/atoms/Button/Button";
import { Input } from "@components/atoms/Input/Input";
import { Form } from "@components/molecules/Form/Form";
import { FormField } from "@components/molecules/FormField/FormField";
import { register as registerUser } from "../api/authApi";
import { Registration, registrationSchema } from "../types/auth.types";

const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );

  // Form setup
  const form = useForm<Registration>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  // Form submission handler
  const handleSubmit = async (data: Registration) => {
    setIsRegistering(true);
    setRegistrationError(null);

    try {
      await registerUser(data);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setRegistrationError(
        error instanceof Error
          ? error.message
          : t("auth.errors.registrationFailed")
      );
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-card p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold">{t("auth.signup")}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("auth.alreadyHaveAccount")}{" "}
            <Link to="/auth/login" className="text-primary hover:underline">
              {t("auth.login")}
            </Link>
          </p>
        </div>

        {registrationError && (
          <div className="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
            {registrationError}
          </div>
        )}

        <Form form={form} onSubmit={handleSubmit} className="space-y-6">
          <FormField name="name" label={t("auth.name")}>
            {({ field, fieldState }) => (
              <Input
                {...field}
                id="name"
                autoComplete="name"
                error={!!fieldState.error}
                disabled={isRegistering}
              />
            )}
          </FormField>

          <FormField name="email" label={t("auth.email")}>
            {({ field, fieldState }) => (
              <Input
                {...field}
                type="email"
                id="email"
                placeholder="you@example.com"
                autoComplete="email"
                error={!!fieldState.error}
                disabled={isRegistering}
              />
            )}
          </FormField>

          <FormField name="password" label={t("auth.password")}>
            {({ field, fieldState }) => (
              <Input
                {...field}
                type="password"
                id="password"
                autoComplete="new-password"
                error={!!fieldState.error}
                disabled={isRegistering}
              />
            )}
          </FormField>

          <FormField name="confirmPassword" label={t("auth.confirmPassword")}>
            {({ field, fieldState }) => (
              <Input
                {...field}
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                error={!!fieldState.error}
                disabled={isRegistering}
              />
            )}
          </FormField>

          <FormField name="acceptTerms">
            {({ field, fieldState }) => (
              <div className="flex items-center">
                <input
                  {...field}
                  id="acceptTerms"
                  type="checkbox"
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  disabled={isRegistering}
                  checked={field.value}
                />
                <label
                  htmlFor="acceptTerms"
                  className={`ml-2 block text-sm ${
                    fieldState.error ? "text-destructive" : "text-foreground"
                  }`}
                >
                  {t("auth.acceptTerms")}{" "}
                  <a href="#" className="text-primary hover:underline">
                    {t("auth.termsOfService")}
                  </a>{" "}
                  {t("common.and")}{" "}
                  <a href="#" className="text-primary hover:underline">
                    {t("auth.privacyPolicy")}
                  </a>
                </label>
              </div>
            )}
          </FormField>

          <div>
            <Button
              type="submit"
              fullWidth
              loading={isRegistering}
              disabled={isRegistering}
            >
              {t("auth.createAccount")}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
