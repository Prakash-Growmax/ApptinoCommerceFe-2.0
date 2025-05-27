import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@components/atoms/Button/Button';
import { Input } from '@components/atoms/Input/Input';
import { Form } from '@components/molecules/Form/Form';
import { FormField } from '@components/molecules/FormField/FormField';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuth } from '../hooks/useAuth';
import { LoginCredentials, loginCredentialsSchema } from '../types/auth.types';

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Get the intended destination
  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  // Form setup
  const form = useForm<LoginCredentials>({
    resolver: zodResolver(loginCredentialsSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  // Form submission handler
  const handleSubmit = async (data: LoginCredentials) => {
    setIsLoggingIn(true);
    setLoginError(null);

    try {
      const success = await login(data);
      if (success) {
        navigate(from, { replace: true });
      }
    } catch (error) {
      setLoginError(
        error instanceof Error ? error.message : t('auth.errors.loginFailed')
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-card p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold">{t('auth.login')}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {t('auth.dontHaveAccount')}{' '}
            <Link to="/auth/register" className="text-primary hover:underline">
              {t('auth.createAccount')}
            </Link>
          </p>
        </div>

        {loginError && (
          <div className="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
            {loginError}
          </div>
        )}

        <Form form={form} onSubmit={handleSubmit} className="space-y-6">
          <FormField name="email" label={t('auth.email')}>
            {({ field, fieldState }) => (
              <Input
                {...field}
                type="email"
                id="email"
                placeholder="you@example.com"
                autoComplete="email"
                error={!!fieldState.error}
                disabled={isLoggingIn}
              />
            )}
          </FormField>

          <FormField name="password" label={t('auth.password')}>
            {({ field, fieldState }) => (
              <Input
                {...field}
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!fieldState.error}
                disabled={isLoggingIn}
              />
            )}
          </FormField>

          <FormField name="rememberMe">
            {({ field }) => (
              <div className="flex items-center">
                <input
                  {...field}
                  id="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  disabled={isLoggingIn}
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-foreground"
                >
                  {t('auth.rememberMe')}
                </label>
              </div>
            )}
          </FormField>

          <div>
            <Button
              type="submit"
              fullWidth
              loading={isLoggingIn}
              disabled={isLoggingIn}
            >
              {t('auth.signIn')}
            </Button>
          </div>

          <div className="text-center">
            <Link
              to="/auth/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              {t('auth.forgotPassword')}
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
