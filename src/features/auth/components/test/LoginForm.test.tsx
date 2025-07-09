import { render, screen, waitFor } from '@/test/utils/render';
import { LoginForm } from '../LoginForm/LoginForm';
import { vi } from 'vitest';

// Mock the dependencies
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('@/stores/appStore', () => {
  const mockStore = {
    loginAction: vi.fn(),
    refreshTokensAction: vi.fn(),
    logoutAction: vi.fn(),
    // Add other store properties that might be used
    user: null,
    tokens: null,
  };

  return {
    default: Object.assign(() => mockStore, {
      getState: () => mockStore,
      setState: vi.fn(),
      subscribe: vi.fn(),
      destroy: vi.fn(),
    }),
  };
});

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('../../api/authApi', () => ({
  checkUserName: vi.fn(),
  login: vi.fn(),
}));

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render login form with email field initially', () => {
    render(<LoginForm />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByText('Login to your Growmax account')).toBeInTheDocument();
  });

  it('should not show password field initially', () => {
    render(<LoginForm />);
    
    expect(screen.queryByLabelText(/password/i)).not.toBeInTheDocument();
  });

  it('should show continue button when no password is required', () => {
    render(<LoginForm />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Continue');
  });

  it('should disable submit button when email is empty', () => {
    render(<LoginForm />);
    
    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeDisabled();
  });

  it('should enable submit button when email is provided', async () => {
    const { user } = render(<LoginForm />);
    
    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'test@example.com');
    
    const submitButton = screen.getByRole('button');
    expect(submitButton).not.toBeDisabled();
  });

  it('should show password field after successful user check', async () => {
    const { checkUserName } = await import('../../api/authApi');
    vi.mocked(checkUserName).mockResolvedValue({
      data: { hasPassword: true }
    });

    const { user } = render(<LoginForm />);
    
    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'test@example.com');
    
    const continueButton = screen.getByRole('button', { name: /continue/i });
    await user.click(continueButton);
    
    await waitFor(() => {
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });
  });

  it('should show change email button when password field is visible', async () => {
    const { checkUserName } = await import('../../api/authApi');
    vi.mocked(checkUserName).mockResolvedValue({
      data: { hasPassword: true }
    });

    const { user } = render(<LoginForm />);
    
    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'test@example.com');
    
    const continueButton = screen.getByRole('button', { name: /continue/i });
    await user.click(continueButton);
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /change email address/i })).toBeInTheDocument();
    });
  });

  it('should toggle password visibility', async () => {
    const { checkUserName } = await import('../../api/authApi');
    vi.mocked(checkUserName).mockResolvedValue({
      data: { hasPassword: true }
    });

    const { user } = render(<LoginForm />);
    
    // First, get to the password field
    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'test@example.com');
    
    const continueButton = screen.getByRole('button', { name: /continue/i });
    await user.click(continueButton);
    
    await waitFor(() => {
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;
    const toggleButton = screen.getByRole('button', { name: /show password/i });
    
    expect(passwordInput.type).toBe('password');
    
    await user.click(toggleButton);
    expect(passwordInput.type).toBe('text');
    
    await user.click(toggleButton);
    expect(passwordInput.type).toBe('password');
  });

  it('should handle user check error', async () => {
    const { checkUserName } = await import('../../api/authApi');
    vi.mocked(checkUserName).mockRejectedValue(new Error('User not found'));

    const { user } = render(<LoginForm />);
    
    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'nonexistent@example.com');
    
    const continueButton = screen.getByRole('button', { name: /continue/i });
    await user.click(continueButton);
    
    await waitFor(() => {
      expect(screen.getByText(/user not found or invalid email/i)).toBeInTheDocument();
    });
  });

  it('should handle successful login', async () => {
    const { checkUserName, login } = await import('../../api/authApi');
    const mockAppStore = await import('@/stores/appStore');
    
    vi.mocked(checkUserName).mockResolvedValue({
      data: { hasPassword: true }
    });
    
    vi.mocked(login).mockResolvedValue({
      tokens: {
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        payload: { userId: '123' }
      }
    });

    const { user } = render(<LoginForm />);
    
    // Enter email and proceed to password
    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'test@example.com');
    
    const continueButton = screen.getByRole('button', { name: /continue/i });
    await user.click(continueButton);
    
    await waitFor(() => {
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    // Enter password and login
    const passwordInput = screen.getByLabelText(/password/i);
    await user.type(passwordInput, 'password123');
    
    const loginButton = screen.getByRole('button', { name: /login/i });
    await user.click(loginButton);
    
    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        UserName: 'test@example.com',
        Password: 'password123'
      });
    });
  });

  it('should handle login error', async () => {
    const { checkUserName, login } = await import('../../api/authApi');
    
    vi.mocked(checkUserName).mockResolvedValue({
      data: { hasPassword: true }
    });
    
    vi.mocked(login).mockRejectedValue(new Error('Invalid credentials'));

    const { user } = render(<LoginForm />);
    
    // Enter email and proceed to password
    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'test@example.com');
    
    const continueButton = screen.getByRole('button', { name: /continue/i });
    await user.click(continueButton);
    
    await waitFor(() => {
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    // Enter wrong password and attempt login
    const passwordInput = screen.getByLabelText(/password/i);
    await user.type(passwordInput, 'wrongpassword');
    
    const loginButton = screen.getByRole('button', { name: /login/i });
    await user.click(loginButton);
    
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  it('should clear password field when changing email', async () => {
    const { checkUserName } = await import('../../api/authApi');
    vi.mocked(checkUserName).mockResolvedValue({
      data: { hasPassword: true }
    });

    const { user } = render(<LoginForm />);
    
    // Get to password field
    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'test@example.com');
    
    const continueButton = screen.getByRole('button', { name: /continue/i });
    await user.click(continueButton);
    
    await waitFor(() => {
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    // Enter password
    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;
    await user.type(passwordInput, 'password123');
    expect(passwordInput.value).toBe('password123');

    // Click change email
    const changeButton = screen.getByRole('button', { name: /change email address/i });
    await user.click(changeButton);
    
    // Password field should be hidden and cleared
    expect(screen.queryByLabelText(/password/i)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
  });
});