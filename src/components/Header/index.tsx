import { Button } from "../ui/button";
import Link from "next/link";
import { pageRoutes } from "@/utils/constants/routes";
import { cookies } from "next/headers";
import LogoutButton from "../buttons/logout-button";

const Header = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value || "";

  return (
    <>
      <header className="sticky top-0 bg-white shadow-lg p-2 z-10">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Product Flow</h1>

            {token ? (
              <div className="flex gap-4">
                <Button asChild>
                  <Link href={pageRoutes.user.profile}>Profile</Link>
                </Button>
                <LogoutButton />
              </div>
            ) : (
              <div className="flex gap-4">
                <Button asChild>
                  <Link href={pageRoutes.auth.login}>Login</Link>
                </Button>
                <Button asChild>
                  <Link href={pageRoutes.auth.signup}>Signup</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
