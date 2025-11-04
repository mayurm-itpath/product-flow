"use client";
import { api } from "@/api";
import FormInput from "@/components/inputs/form-input";
import { Button } from "@/components/ui/button";
import { apiAsyncHandler } from "@/utils/helper";
import { forgotPasswordValidation } from "@/utils/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordValidation),
    defaultValues: { email: "" },
  });

  const onSubmit = (formData: ForgotPasswordFormData) => {
    apiAsyncHandler(
      async () => {
        const res = await api.auth.forgotPassword({ data: formData });
        console.log("Forgot Password Response: ", res);
        toast.success("Password reset link sent to your email.");
      },
      () => {
        toast.error("Failed to send password reset link.");
      }
    );
  };

  return (
    <>
      <section>
        <div className="flex flex-col items-center gap-5 py-[50px]">
          <h2 className="text-2xl font-bold">Forgot Password</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="w-[350px]">
            <div>
              <FormInput
                {...register("email")}
                type="email"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <br />

            <center>
              <Button type="submit">Send Reset Link</Button>
            </center>
          </form>
        </div>
      </section>
    </>
  );
};

export default ForgotPasswordForm;
