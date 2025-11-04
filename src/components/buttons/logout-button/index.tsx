"use client";
import { api } from "@/api";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/use-app-store";
import { pageRoutes } from "@/utils/constants/routes";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LogoutButton = () => {
  const router = useRouter();
  const { clearUserInfo } = useAppStore();

  const handleLogout = async () => {
    const res: any = await api.auth.logout({});
    clearUserInfo();
    toast.success(res.data.message || "Logged out successfully!");
    router.push(pageRoutes.auth.login);
    router.refresh();
  };

  return (
    <>
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
};

export default LogoutButton;
