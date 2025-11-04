"use client";
import { api } from "@/api";
import FormInput from "@/components/inputs/form-input";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/use-app-store";
import { pageRoutes } from "@/utils/constants/routes";
import { apiAsyncHandler } from "@/utils/helper";
import { editProfileValidation } from "@/utils/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  profilePic?: File | undefined;
}

const EditProfileForm = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const router = useRouter();

  const initialFormData = {
    firstName: "",
    lastName: "",
    phone: "",
    profilePic: undefined,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(editProfileValidation),
    defaultValues: initialFormData,
  });

  useEffect(() => {
    if (userInfo) {
      reset({
        firstName: userInfo.firstName || "",
        lastName: userInfo.lastName || "",
        phone: userInfo.phone || "",
      });
    }
  }, [userInfo, reset]);

  const onSubmit = async (data: FormData) => {
    apiAsyncHandler(
      async () => {
        const formData = new FormData();
        formData.append("firstName", data.firstName);
        formData.append("lastName", data.lastName);
        formData.append("phone", data.phone);
        if (data.profilePic) {
          formData.append("profilePic", data.profilePic);
        }

        const res: any = await api.user.updateById({
          id: userInfo!.id,
          data: formData,
        });
        setUserInfo(res.data.user);
        toast.success(res.data.message || "Profile updated successfully!");
        router.push(pageRoutes.user.profile);
        router.refresh();
      },
      (error: any) => {
        toast.error(error?.message || "Failed to update profile.");
      }
    );
  };

  return (
    <>
      <section>
        <div className="flex flex-col items-center gap-5 py-[50px]">
          <h2 className="text-2xl font-bold">Edit Profile</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="w-[350px]">
            <div>
              <FormInput {...register("firstName")} placeholder="First Name" />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <br />

            <div>
              <FormInput {...register("lastName")} placeholder="Last Name" />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
            <br />

            <div>
              <FormInput {...register("phone")} placeholder="Phone Number" />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <br />

            <div>
              <Controller
                control={control}
                name="profilePic"
                render={({ field }) => (
                  <FormInput
                    type="file"
                    name={field.name}
                    onBlur={field.onBlur}
                    onChange={(e) =>
                      field.onChange(e.target.files?.[0] || undefined)
                    }
                    ref={field.ref}
                  />
                )}
              />
              {errors.profilePic && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.profilePic.message}
                </p>
              )}
            </div>
            <br />

            <center>
              <Button type="submit">Save Changes</Button>
            </center>
          </form>
        </div>
      </section>
    </>
  );
};

export default EditProfileForm;
