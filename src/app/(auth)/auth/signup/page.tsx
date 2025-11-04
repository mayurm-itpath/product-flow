import AuthForm from "@/components/forms/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup",
  description: "Create a new account",
};

const SignupPage = () => {
  return (
    <>
      <AuthForm isLogin={false} />
    </>
  );
};

export default SignupPage;
