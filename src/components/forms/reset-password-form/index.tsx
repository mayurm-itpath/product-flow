"use client";
import { api } from "@/api";
import FormInput from "@/components/inputs/form-input";
import { Button } from "@/components/ui/button";
import { pageRoutes } from "@/utils/constants/routes";
import { apiAsyncHandler } from "@/utils/helper";
import { resetPasswordValidation } from "@/utils/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Metadata } from "next";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your password",
};

interface ResetPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

const ResetPasswordForm = () => {
  const { token }: { token: string } = useParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordValidation),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  const onSubmit = (formData: ResetPasswordFormData) => {
    console.log("Reset Password Form Data: ", formData);
    apiAsyncHandler(
      async () => {
        const res: any = await api.auth.resetPassword({
          data: formData,
          token,
        });
        toast.success(
          res.data.message || "Password has been reset successfully."
        );
        router.push(pageRoutes.auth.login);
      },
      () => {
        toast.error("Failed to reset password.");
      }
    );
  };

  return (
    <>
      <section>
        <div className="flex flex-col items-center gap-5 py-[50px]">
          <h2 className="text-2xl font-bold">Reset Password</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="w-[350px]">
            <div>
              <FormInput
                {...register("newPassword")}
                type="password"
                placeholder="New Password"
              />
              {errors.newPassword && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
            <br />

            <div>
              <FormInput
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <br />

            <center>
              <Button type="submit">Reset Password</Button>
            </center>
          </form>
        </div>
      </section>
    </>
  );
};

export default ResetPasswordForm;
