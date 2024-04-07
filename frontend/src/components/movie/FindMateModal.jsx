import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  addInterestedUser,
  getAllInterestedUsers,
  removeInterestedUser,
} from "@/actions/movieActions";
import { useAtomValue } from "jotai";
import { userAtom } from "@/lib/store/store";

const FindMateModal = ({ setModal, movie }) => {
  const [interestedUsers, setInterestedUsers] = useState([]);
  const user = useAtomValue(userAtom);
  console.log(user._id);
  const submitHandler = async () => {
    const response = await addInterestedUser(movie.id, user._id, movie.title);
    if (response.success) {
      setInterestedUsers([...interestedUsers, user]); // or setInterestedUsers(prevInterestedUsers => [...prevInterestedUsers, user]);
    } else {
      console.log(response.message);
    }
  };
  const removeUserHandler = async () => {
    const response = await removeInterestedUser(movie.id, user._id); // Corrected function name
    if (response.success) {
      setInterestedUsers(
        interestedUsers.filter((data) => data._id !== user._id)
      );
    } else {
      console.log(response.message);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      const response = await getAllInterestedUsers(movie.id);
      setInterestedUsers(response?.interestedUsers);
    };
    getUsers();
  }, []);

  return (
    <div
      onClick={() => setModal(false)}
      className="w-full h-full fixed top-0 left-0 bg-black/50 z-[1000] flex items-center justify-center modal"
    >
      <div
        className="max-w-2xl max-h-[90vh] w-full bg-background border border-foreground/20 p-6 rounded-xl overflow-y-scroll no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-xl font-semibold text-center">
          Users interested to watch {movie.title}
        </h1>
        {interestedUsers && (
          <div className="py-4 space-y-2">
            {interestedUsers?.map((data) => {
              return (
                <div
                  key={data._id}
                  className="flex items-center gap-3 bg-secondary rounded-lg px-4 p-2 w-full"
                >
                  <img
                    src={data.image}
                    alt="pfp"
                    className="w-14 h-14 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{data.fullName}</p>
                    <div className="flex items-center gap-2 font-medium dark:text-zinc-300 text-zinc-500">
                      <p>{data.age}, </p>
                      <p>{data.gender}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {interestedUsers?.length < 1 && (
          <p className="dark:text-zinc-300 py-12 text-center font-semibold text-zinc-500">
            Oops! No users found. <br /> Be the first one to show interest 🍿
          </p>
        )}
        <div className="w-fit mx-auto space-y-2">
          {interestedUsers && (
            <p className="dark:text-zinc-300 text-zinc-500">
              Didn&apos;t find your mate?
            </p>
          )}

          {interestedUsers.some((user) => user._id === user._id) ? (
            <Button
              variant="destructive"
              onClick={removeUserHandler}
              className="w-full"
            >
              Remove me from the list
            </Button>
          ) : (
            <Button onClick={submitHandler} className="w-full">
              Add me on the list!
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindMateModal;
