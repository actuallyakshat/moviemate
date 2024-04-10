import { userAtom } from "@/lib/store/store";
import { useAtom } from "jotai";
import { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDetailsById } from "../../actions/userActions";
import { ProfileHeader } from "./ProfileHeader";
import { Photos } from "./Photos";
import Loading from "../Loading/Loading";

const Profile = () => {
  const location = useLocation();
  const previousPathnameRef = useRef(location.pathname);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.pathname !== previousPathnameRef.current) {
      window.location.reload();
      previousPathnameRef.current = location.pathname;
    }
  }, [location]);

  const { id } = useParams();
  const [currentUser] = useAtom(userAtom);
  const [userProfile, setUserProfile] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch details for both currentUser._id and id from params
    Promise.all([getDetailsById(currentUser?._id), getDetailsById(id)])
      .then(([currentUserData, userData]) => {
        if (currentUserData && currentUserData.success) {
          setUserProfile(currentUserData.user);
        } else {
          console.error(
            "Error fetching current user details:",
            currentUserData.error
          );
        }
        if (userData && userData.success) {
          setUser(userData.user);
        } else {
          console.error("Error fetching user details:", userData.error);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]); // Add currentUser to the dependency array

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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

          <ProfileHeader user={user} />
          <Photos user={user} />
        </div>
      )}
    </>
  );
};

export default Profile;
