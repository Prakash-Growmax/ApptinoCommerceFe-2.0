import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@/components/atoms/Button/Button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { checkUserName, login } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';



export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { t } = useTranslation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [hasPassword, setHasPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const navigate = useNavigate();
  const handleCheckUser = async () => {
    if (!email) return;
    setIsLoading(true);
    try {
      const response = await checkUserName({ UserName: email });
      if (response?.data) {
        response?.data?.hasPassword && setHasPassword(true);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!email && !password) return;
    setIsLoading(true);
    try {
      const response = await login({ UserName: email, Password: password });
      if(response){
        navigate("/")
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onContinueKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e);
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCheckUser();
    }
  };

  const onLoginKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e);
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLogin();
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn('flex flex-col gap-6', className)} {...props}>
          <Card>
            <CardContent>
              <div className="p-4">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <p className="text-balance text-muted-foreground">
                      Login to your Acme Inc account
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      onChange={handleEmailChange}
                      required
                      onKeyDown={onContinueKeyDown}
                    />
                  </div>
                  {hasPassword && (
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a
                          href="#"
                          className="ml-auto text-sm underline-offset-2 hover:underline"
                        >
                          Forgot your password?
                        </a>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        onChange={handlePasswordChange}
                        autoFocus
                        required
                        onKeyDown={onLoginKeyDown}
                      />
                    </div>
                  )}
                  {hasPassword ? (
                    <Button
                      className="w-full"
                      loading={isLoading}
                      onClick={handleLogin}
                    >
                      {t('Login')}
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      onClick={handleCheckUser}
                      loading={isLoading}
                      isDisabled={isLoading}
                    >
                      {t('Continue')}
                    </Button>
                  )}
                  <div className="text-center text-sm">
                    Don&apos;t have an account?{' '}
                    <a href="#" className="underline underline-offset-4">
                      Sign up
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
