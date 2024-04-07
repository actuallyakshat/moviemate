import { userAtom } from "@/lib/store/store";
import { useAtom } from "jotai";
import React from "react";
import { ProfileHeader } from "./ProfileHeader";
import { Photos } from "./Photos";

const Profile = () => {
  const user = useAtom(userAtom);
  return (
    <div className="pt-16">
      {/* <div className="relative">
        <img
          src="https://static.vecteezy.com/system/resources/previews/000/677/302/original/abstract-technology-banner-background.jpg"
          className="w-full h-full max-h-[20rem] overflow-hidden bg-zinc-300 object-cover aspect-video"
        />
        <img
          src="https://is1-ssl.mzstatic.com/image/thumb/AMCArtistImages116/v4/74/9b/d1/749bd157-c81b-2c54-9940-16c13cecaa95/e5e09754-1d06-4a09-b2e1-6c24f77e0157_file_cropped.png/486x486bb.png"
          alt="profile"
          className="w-56 h-56 rounded-full absolute bottom-0 left-16 translate-y-1/3 border-2"
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold pt-28 pl-16">Akshat Dubey</h1>
        <p>{user.bio}</p>
      </div> */}
      <ProfileHeader />
      <Photos />
    </div>
  );
};

export default Profile;
