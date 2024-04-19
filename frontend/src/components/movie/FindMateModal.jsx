import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import {
  addInterestedUser,
  getAllInterestedUsers,
  removeInterestedUser,
} from "@/actions/movieActions";
import { useAtom, useAtomValue } from "jotai";
import { userAtom } from "@/lib/store/store";
import {
  sendFriendRequest,
  getFriends,
  getPendingRequest,
} from "@/actions/friendActions";
import { useToast } from "../ui/use-toast";
import LoadingSpinner from "../Loading/LoadingSpinner";

const FindMateModal = ({ setModal, movie }) => {
  const navigate = useNavigate();
  const [loadingUser, setLoadingUsers] = useState(false);
  const [loadingMap, setLoadingMap] = useState({});
  const [addMeLoading, setAddMeLoading] = useState(false);
  const [requestLoading, setRequestLoading] = useState(true);
  const { toast } = useToast();
  const [interestedUsers, setInterestedUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [user, setUser] = useAtom(userAtom);

  const submitHandler = async () => {
    setAddMeLoading(true);
    const response = await addInterestedUser(movie.id, user._id, movie.title);
    setAddMeLoading(false);
    if (response.success) {
      toast({
        title: "Success",
        description: "You are added on the list",
      });
      setInterestedUsers([...interestedUsers, user]);
    } else {
      console.error(response.message);
    }
  };

  const removeUserHandler = async () => {
    setAddMeLoading(true);
    const response = await removeInterestedUser(movie.id, user._id);
    setAddMeLoading(false);
    if (response.success) {
      toast({
        title: "Removed",
        description: "You are removed from the list",
      });
      setInterestedUsers(
        interestedUsers.filter((data) => data._id !== user._id),
      );
    } else {
      console.error(response.message);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      setLoadingUsers(true);
      const response = await getAllInterestedUsers(movie.id);
      setInterestedUsers(response?.interestedUsers);
      await getFriends(user._id, setFriends);
      await getPendingRequest(
        user._id,
        setIncomingRequests,
        setOutgoingRequests,
      );
      setRequestLoading(false);
      setLoadingUsers(false);
    };
    getUsers();
  }, []);

  const addMateHandler = async (potentialMate) => {
    setLoadingMap({ ...loadingMap, [potentialMate._id]: true });
    const response = await sendFriendRequest(
      user._id,
      potentialMate._id,
      movie.id,
      movie.title,
    );
    if (response.success) {
      const updatedUser = { ...user };
      updatedUser.friends.push(response.newRequest); // Assuming newRequest contains the new friendship request
      setUser(updatedUser); // Set the updated currentUser
      //set the potentialMate in the outgoing request
      setOutgoingRequests([
        ...outgoingRequests,
        { friend: potentialMate, movie: { tmdbId: movie.id } },
      ]);
    }
    setLoadingMap({ ...loadingMap, [potentialMate._id]: false });
  };

  return (
    <div
      onClick={() => setModal(false)}
      className="modal fixed left-0 top-0 z-[1000] flex h-full w-full items-center justify-center bg-black/50"
    >
      <div
        className="no-scrollbar max-h-[90vh] w-full max-w-2xl overflow-y-scroll rounded-xl border border-foreground/20 bg-background p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-center text-xl font-semibold">
          Users interested to watch {movie.title}
        </h1>
        {loadingUser ? (
          <div className="mx-auto mb-2 mt-6 w-fit">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {interestedUsers && (
              <div className="space-y-2 py-4">
                {interestedUsers.map((data) => (
                  <div
                    key={data._id}
                    className="flex w-full items-center justify-between rounded-lg border bg-zinc-100 p-2 px-4 shadow-md dark:bg-secondary"
                  >
                    <div className="flex gap-3">
                      <img
                        src={data.profileImage}
                        alt="pfp"
                        className="h-14 w-14 rounded-full object-cover"
                      />
                      <div className="my-auto h-fit">
                        <p
                          className="cursor-pointer font-semibold"
                          onClick={() => {
                            navigate(`/profile/${data._id}`);
                          }}
                        >
                          {data.fullName}
                        </p>

                        <div className="flex items-center gap-1 font-medium text-zinc-500 dark:text-zinc-300">
                          <p>{data.age}, </p>
                          <p>{data.gender}</p>
                        </div>
                      </div>
                    </div>
                    {loadingMap[data._id] ? (
                      <div>
                        <LoadingSpinner />
                      </div>
                    ) : (
                      <>
                        {requestLoading ? (
                          <div>
                            <LoadingSpinner />
                          </div>
                        ) : (
                          <>
                            {data._id !== user._id && (
                              <>
                                {outgoingRequests.some(
                                  (friend) => friend.friend._id === data._id,
                                ) ? (
                                  <p className="text-sm font-medium">
                                    Request Sent{" "}
                                  </p>
                                ) : friends.some(
                                    (friend) => friend.friend._id === data._id,
                                  ) ? (
                                  <Button
                                    variant="ghost"
                                    onClick={() => {
                                      navigate(`/chat`);
                                    }}
                                  >
                                    Chat
                                  </Button>
                                ) : (
                                  <>
                                    {incomingRequests.some(
                                      (friend) =>
                                        friend.friend._id === data._id,
                                    ) ? (
                                      <p className="text-sm font-medium">
                                        Request Received
                                      </p>
                                    ) : (
                                      <Button
                                        onClick={() => addMateHandler(data)}
                                      >
                                        Add Mate
                                      </Button>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
            {interestedUsers?.length < 1 && (
              <p className="pb-12 pt-8 text-center font-semibold text-zinc-500 dark:text-zinc-300">
                Oops! No users found. <br /> Be the first one to show interest
                🍿
              </p>
            )}
            <div className="mx-auto w-fit space-y-1">
              {interestedUsers && (
                <p className="text-center tracking-tight text-zinc-500 dark:text-zinc-300">
                  Didn&apos;t find your mate?
                </p>
              )}

              {!addMeLoading ? (
                interestedUsers.some((data) => data._id === user._id) ? (
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
                )
              ) : (
                <>
                  {addMeLoading && (
                    <div className="mx-auto w-fit">
                      <LoadingSpinner />
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FindMateModal;
