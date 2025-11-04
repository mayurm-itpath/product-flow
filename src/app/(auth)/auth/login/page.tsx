import AuthForm from '@/components/forms/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

const LoginPage = () => {
  return (
    <>
      <AuthForm isLogin={true} />
    </>
  )
}

export default LoginPage
