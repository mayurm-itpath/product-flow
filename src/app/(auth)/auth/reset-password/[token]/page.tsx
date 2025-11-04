import ResetPasswordForm from "@/components/forms/reset-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your password",
};

const ResetPasswordPage = () => {
  return (
    <>
      <ResetPasswordForm />
    </>
  );
};

export default ResetPasswordPage;
