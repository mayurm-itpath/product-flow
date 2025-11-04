"use client";

import { api } from "@/api";
import FormInput from "@/components/inputs/form-input";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/use-app-store";
import { pageRoutes } from "@/utils/constants/routes";
import { apiAsyncHandler } from "@/utils/helper";
import { loginValidation, signupValidation } from "@/utils/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface AuthFormProps {
  isLogin?: boolean;
}

interface FormData {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  phone?: string;
  profilePic?: File | undefined;
}

const AuthForm = ({ isLogin = false }: AuthFormProps) => {
  const validationSchema = isLogin ? loginValidation : signupValidation;
  const router = useRouter();
  const { setUserInfo } = useAppStore();

  const initialFormData: FormData = isLogin
    ? {
        email: "",
        password: "",
      }
    : {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
      };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
    defaultValues: initialFormData,
  });

  const onSubmit = async (formData: FormData) => {
    apiAsyncHandler(
      async () => {
        if (isLogin) {
          const res: any = await api.auth.login({ data: formData });
          setUserInfo(res.data.user);
          toast.success(res.data.message || "Login successful!");
          router.push(pageRoutes.user.dashboard);
          router.refresh();
        } else {
          const res: any = await api.auth.signup({ data: formData });
          setUserInfo(res.data.user);
          toast.success(res.data.message || "Signup successful!");
          router.push(pageRoutes.auth.login);
          router.refresh();
        }
      },
      (error: any) => {
        if (isLogin) {
          toast.error(error?.message || "Login failed. Please try again.");
        } else {
          toast.error(error?.message || "Signup failed. Please try again.");
        }
      }
    );
  };

  return (
    <>
      <section>
        <div className="flex flex-col items-center gap-5 py-[50px]">
          <h2 className="text-2xl font-bold">
            {isLogin ? "Login" : "Sign Up"}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="w-[350px]">
            {isLogin ? null : (
              <>
                <div>
                  <FormInput
                    {...register("firstName")}
                    placeholder="First Name"
                  />
                  {errors.firstName && (
                    <div className="text-red-500 text-sm">
                      {errors.firstName.message}
                    </div>
                  )}
                </div>
                <br />

                <div>
                  <FormInput
                    {...register("lastName")}
                    placeholder="Last Name"
                  />
                  {errors.lastName && (
                    <div className="text-red-500 text-sm">
                      {errors.lastName.message}
                    </div>
                  )}
                </div>
                <br />

                <div>
                  <FormInput
                    {...register("phone")}
                    placeholder="Phone Number"
                  />
                  {errors.phone && (
                    <div className="text-red-500 text-sm">
                      {errors.phone.message}
                    </div>
                  )}
                </div>
                <br />
              </>
            )}

            <div>
              <FormInput
                type="email"
                {...register("email")}
                placeholder="Email"
              />
              {errors.email && (
                <div className="text-red-500 text-sm">
                  {errors.email.message}
                </div>
              )}
            </div>
            <br />

            <div>
              <FormInput
                type="password"
                {...register("password")}
                placeholder="Password"
              />
              {errors.password && (
                <div className="text-red-500 text-sm">
                  {errors.password.message}
                </div>
              )}
            </div>
            <br />

            <center>
              {isLogin ? (
                <>
                  <Link
                    href={pageRoutes.auth.forgotPassword}
                    className="text-sm text-blue-500 underline"
                  >
                    Forgot Password?
                  </Link>
                  <br />
                </>
              ) : null}

              {isLogin ? (
                <Link
                  href={pageRoutes.auth.signup}
                  className="text-sm text-blue-500 underline"
                >
                  Don't have an account? Sign up
                </Link>
              ) : (
                <Link
                  href={pageRoutes.auth.login}
                  className="text-sm text-blue-500 underline"
                >
                  Already have an account? Log in
                </Link>
              )}
              <br />
              <br />

              <Button type="submit">{isLogin ? "Login" : "Sign Up"}</Button>
            </center>
          </form>
        </div>
      </section>
    </>
  );
};

export default AuthForm;
