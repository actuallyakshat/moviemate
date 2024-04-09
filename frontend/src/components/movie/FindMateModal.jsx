import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import {
  addInterestedUser,
  getAllInterestedUsers,
  removeInterestedUser,
} from "@/actions/movieActions";
import { useAtomValue } from "jotai";
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
  const [loadingMap, setLoadingMap] = useState({});
  const [addMeLoading, setAddMeLoading] = useState(false);
  const [requestLoading, setRequestLoading] = useState(true);
  const { toast } = useToast();
  const [interestedUsers, setInterestedUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const user = useAtomValue(userAtom);

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
      console.log(response.message);
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
      await getFriends(user._id, setFriends);
      await getPendingRequest(
        user._id,
        setIncomingRequests,
        setOutgoingRequests
      );
      setRequestLoading(false);
    };
    getUsers();
  }, []);

  const addMateHandler = async (potentialMate) => {
    setLoadingMap({ ...loadingMap, [potentialMate._id]: true });
    const response = await sendFriendRequest(
      user._id,
      potentialMate._id,
      movie.id,
      movie.title
    );
    if (response.success) {
      console.log("Friend request sent");
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
            {interestedUsers.map((data) => (
              <div
                key={data._id}
                className="flex items-center justify-between bg-zinc-100 dark:bg-secondary shadow-md border rounded-lg px-4 p-2 w-full"
              >
                <div className="flex gap-3">
                  <img
                    src={data.profileImage}
                    alt="pfp"
                    className="w-14 h-14 rounded-full"
                  />
                  <div className="h-fit my-auto">
                    <p className="font-semibold">{data.fullName}</p>
                    <div className="flex items-center gap-1 font-medium dark:text-zinc-300 text-zinc-500">
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
                              (friend) => friend.friend._id === data._id
                            ) ? (
                              <p className="text-sm font-medium">
                                Request Sent{" "}
                              </p>
                            ) : friends.some(
                                (friend) => friend.friend._id === data._id
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
                                  (friend) => friend.friend._id === data._id
                                ) ? (
                                  <p className="text-sm font-medium">
                                    Request Received
                                  </p>
                                ) : (
                                  <Button onClick={() => addMateHandler(data)}>
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
          <p className="dark:text-zinc-300 pt-8 pb-12 text-center font-semibold text-zinc-500">
            Oops! No users found. <br /> Be the first one to show interest 🍿
          </p>
        )}
        <div className="w-fit mx-auto space-y-1">
          {interestedUsers && (
            <p className="dark:text-zinc-300 text-center tracking-tight text-zinc-500">
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
                <div className="w-fit mx-auto">
                  <LoadingSpinner />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindMateModal;
