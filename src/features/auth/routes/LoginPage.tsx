import logo from '@assets/images/logos/growmaxLogo.png';

import { LoginForm } from '../components/LoginForm/LoginForm';

const Login = () => {
  return (
    <div className="max-h-screen flex flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 p-2 z-50 lg:ml-8 mt-2 sm:left-0 sm:translate-x-0">
        <img src={logo} alt="Logo" className="h-12 w-auto" />
      </div>

      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
};
export default Login;
