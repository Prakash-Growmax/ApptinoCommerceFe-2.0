import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Form } from '@/components';
import Button from '@/components/atoms/Button/Button';
import { FormInput } from '@/components/molecules/ReactHookForm';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import useAppStore from '@/stores/appStore';

import { checkUserName, login } from '../../api/authApi';
import {
  LoginRequestSchema,
  LoginSchemaType,
} from '../../schemas/auth.schemas';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [hasPassword, setHasPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string>('');

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginRequestSchema),
    defaultValues: {
      UserName: '',
      Password: '',
    },
    mode: 'onSubmit',
  });

  const { watch, setError, clearErrors, setValue } = form;
  const UserName = watch('UserName');
  const Password = watch('Password');

  const { loginAction } = useAppStore();

  const handleCheckUser = async () => {
    if (!UserName) return;

    const isValid = await form.trigger('UserName');
    if (!isValid) return;

    setIsLoading(true);
    setApiError('');
    clearErrors();

    try {
      const response = await checkUserName({ UserName });
      if (response?.data) {
        if (response?.data?.hasPassword) {
          setHasPassword(true);
        }
      }
    } catch (error: any) {
      console.error('Fetch error:', error);
      setApiError(error.message || 'Failed to check user');
      setError('UserName', {
        type: 'manual',
        message: 'User not found or invalid email',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!UserName || !Password) return;

    const isValid = await form.trigger(['UserName', 'Password']);
    if (!isValid) return;

    setIsLoading(true);
    setApiError('');
    clearErrors();

    try {
      const loginData = await login({
        UserName: UserName,
        Password: Password,
      });

      const accessToken = loginData?.tokens?.accessToken;
      const refreshToken = loginData?.tokens?.refreshToken;
      const payload = loginData?.tokens?.payload;
      loginAction(accessToken, refreshToken, payload);
      toast.success('Logged In Successfully.');
      navigate('/');
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeEmail = () => {
    setHasPassword(false);
    setValue('Password', '');
    clearErrors('Password');
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn('flex flex-col gap-3', className)} {...props}>
          <Card>
            <CardContent>
              <div className="p-4">
                <Form
                  form={form}
                  onSubmit={() => {}}
                  className="flex flex-col gap-3"
                >
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Welcome</h1>
                    <p className="text-balance text-muted-foreground">
                      Login to your Growmax account
                    </p>
                  </div>

                  {apiError && (
                    <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                      {apiError}
                    </div>
                  )}

                  <FormInput
                    name="UserName"
                    label="Email"
                    type="email"
                    placeholder="Enter email"
                    autoComplete="UserName"
                    disabled={isLoading}
                    autoFocus={!hasPassword}
                    className="mb-0!"
                    rightElement={
                      hasPassword && (
                        <a
                          className="ml-auto inline-block text-sm cursor-pointer"
                          onClick={handleChangeEmail}
                        >
                          Change
                        </a>
                      )
                    }
                  />

                  {hasPassword && (
                    <div className="space-y-2">
                      <FormInput
                        label="Password"
                        name="Password"
                        type="password"
                        placeholder="Enter password"
                        autoComplete="current-password"
                        disabled={isLoading}
                        autoFocus={hasPassword}
                      />
                    </div>
                  )}
                  <Button
                    type="submit"
                    className="w-full"
                    loading={isLoading}
                    isDisabled={
                      isLoading || !UserName || (hasPassword && !Password)
                    }
                    onClick={hasPassword ? handleLogin : handleCheckUser}
                  >
                    {hasPassword ? t('Login') : t('Continue')}
                  </Button>
                </Form>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
