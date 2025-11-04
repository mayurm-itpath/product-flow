"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppStore } from "@/store/use-app-store";
import { pageRoutes } from "@/utils/constants/routes";
import Image from "next/image";
import Link from "next/link";

const ProfileCard = () => {
  const { userInfo } = useAppStore();

  return (
    <>
      <section>
        <div className="flex justify-center py-[50px]">
          <Card className="w-[350px] flex flex-col justify-center items-center">
            <h2 className="text-xl font-bold">Profile</h2>

            <div className="flex flex-col justify-center items-center gap-4">
              {userInfo?.profilePic ? (
                <Image
                  src={userInfo.profilePic}
                  alt="Profile Picture"
                  width={100}
                  height={100}
                />
              ) : null}
              <span>
                <strong>Full Name:</strong> {userInfo?.firstName}{" "}
                {userInfo?.lastName}
              </span>
              <span>
                <strong>Email:</strong> {userInfo?.email}
              </span>
              <span>
                <strong>Phone:</strong> {userInfo?.phone}
              </span>
              <Button asChild>
                <Link href={pageRoutes.user.editProfile}>Edit Profile</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
};

export default ProfileCard;
