import { useEffect, useState } from "react";
import {
  getFriends,
  getPendingRequest,
  acceptFriendRequest,
  declineFriendRequest,
  cancelFriendRequest,
  removeFriend,
} from "../../actions/friendActions";
import { useAtomValue } from "jotai";
import { userAtom } from "../../lib/store/store";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

const Mates = () => {
  const { toast } = useToast();
  const user = useAtomValue(userAtom);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getFriends(user._id, setFriends);
      getPendingRequest(user._id, setIncomingRequests, setOutgoingRequests)
        .then(() => setLoading(false)) // Set loading to false after data is fetched
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false); // In case of error, still set loading to false to prevent indefinite loading
        });
    }
  }, [user]);

  const acceptFriendHandler = async (userId, friend) => {
    const response = await acceptFriendRequest(userId, friend._id);
    if (response.success) {
      toast({
        title: "Success",
        description: "Mate request accepted successfully",
      });
      setIncomingRequests(
        incomingRequests.filter((f) => f.friend._id !== friend._id)
      );
      setFriends([...friends, { friend }]);
    } else {
      console.error("Error accepting friend request", response.message);
    }
  };

  const declineFriendHandler = async (userId, friendId) => {
    const response = await declineFriendRequest(userId, friendId);
    if (response.success) {
      toast({
        title: "Oops",
        description: "Mate request declined successfully",
        variant: "destructive",
      });
      setIncomingRequests(
        incomingRequests.filter((f) => f.friend._id !== friendId)
      );
    } else {
      console.error("Error accepting friend request", response.message);
    }
  };

  const cancelFriendHandler = async (userId, friendId) => {
    const response = await cancelFriendRequest(userId, friendId);
    if (response.success) {
      toast({
        title: "Mate request cancelled",
        description: "Mate request cancelled successfully",
        variant: "destructive",
      });
      setOutgoingRequests(
        outgoingRequests.filter((f) => f.friend._id !== friendId)
      );
    } else {
      console.error("Error accepting friend request", response.message);
    }
  };

  const deleteFriendHandler = async (userId, friendId) => {
    const response = await removeFriend(userId, friendId);
    if (response.success) {
      toast({
        title: "Mate deleted",
        description: "Mate deleted successfully",
        variant: "destructive",
      });
      setFriends(friends.filter((f) => f.friend._id !== friendId));
    } else {
      console.error("Error deleting friend", response.message);
    }
  };

  // Render loading spinner while data is being fetched
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="pt-20 w-full">
      <div className="grid grid-col-1 md:grid-cols-2 gap-8 max-w-7xl w-full mx-auto p-4">
        <div className="col-span-1">
          <h1 className="text-3xl font-semibold">Incoming Requests</h1>
          <div className="mt-5 space-y-2">
            {incomingRequests.length > 0 ? (
              incomingRequests.map((friend) => (
                <div
                  key={friend.friend._id}
                  className="p-2 shadow-md flex w-full items-center justify-between gap-4 border rounded-xl px-4"
                >
                  <div className="flex items-center justify-center gap-4">
                    <img
                      src={friend?.friend?.profileImage}
                      className="w-14 h-14 my-auto rounded-full"
                    />
                    <div>
                      <h1
                        className="font-semibold cursor-pointer"
                        onClick={() => {
                          navigate(`/profile/${friend?.friend?._id}`);
                        }}
                      >
                        {friend.friend.fullName}
                      </h1>
                      <div className="text-sm text-foreground/80">
                        <h4>
                          For:{" "}
                          <span className="font-semibold">
                            {friend?.movie?.movieName}
                          </span>
                        </h4>
                        <div className="flex gap-1">
                          <h4>{friend?.friend?.age},</h4>
                          <h4>{friend?.friend?.gender} </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-x-3 flex">
                    <Button
                      variant="ghost"
                      className="hover:text-red-500"
                      onClick={() =>
                        declineFriendHandler(user._id, friend.friend._id)
                      }
                    >
                      Decline
                    </Button>
                    <Button
                      variant="ghost"
                      className="hover:text-green-500"
                      onClick={() =>
                        acceptFriendHandler(user._id, friend.friend)
                      }
                    >
                      Accept
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="font-medium text-secondary-foreground/70">
                There are no incoming requests
              </p>
            )}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-semibold">Outgoing Requests</h1>
          <div className="mt-5 space-y-2">
            {outgoingRequests?.length > 0 ? (
              outgoingRequests?.map((friend) => (
                <div
                  key={friend.friend._id}
                  className="flex items-center justify-between bg-zinc-100 dark:bg-secondary shadow-md border rounded-lg px-4 p-2 w-full"
                >
                  <div className="flex gap-3">
                    <img
                      src={friend.friend.profileImage}
                      className="w-14 h-14 my-auto rounded-full"
                    />
                    <div className="h-fit my-auto">
                      <h1
                        className="font-semibold cursor-pointer"
                        onClick={() => {
                          navigate(`/profile/${friend?.friend?._id}`);
                        }}
                      >
                        {friend.friend.fullName}
                      </h1>
                      <div className="text-sm text-foreground/80">
                        <h4>
                          For:{" "}
                          <span className="font-semibold">
                            {friend?.movie?.movieName}
                          </span>
                        </h4>
                        <div className="flex gap-1">
                          <h4>{friend?.friend?.age},</h4>
                          <h4>{friend?.friend?.gender} </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="hover:text-red-500"
                    onClick={() =>
                      cancelFriendHandler(user._id, friend.friend._id)
                    }
                  >
                    Cancel
                  </Button>
                </div>
              ))
            ) : (
              <p className="font-medium text-secondary-foreground/70">
                There are no outgoing requests
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="my-2 h-[0.5px] dark:bg-gray-300/30 bg-gray-600/20" />
      <div className="p-4 max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold max-w-7xl mx-auto">All Mates</h1>
        <div className="pt-5 space-y-2">
          {friends?.length > 0 ? (
            friends?.map((friend) => (
              <div
                key={friend._id}
                className="flex items-center justify-between bg-zinc-100 dark:bg-secondary shadow-md border rounded-lg px-4 p-2 w-full"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={friend?.friend?.profileImage}
                    alt="pfp"
                    className="w-14 h-14 my-auto rounded-full"
                  />
                  <div className="flex flex-col">
                    <h1
                      className="font-semibold cursor-pointer text-lg"
                      onClick={() => {
                        navigate(`/profile/${friend?.friend?._id}`);
                      }}
                    >
                      {friend?.friend?.fullName}
                    </h1>
                    <div className="text-sm text-foreground/80">
                      <h4>
                        Met via:{" "}
                        <span className="font-semibold">
                          {friend?.movie?.movieName}
                        </span>
                      </h4>
                      <div className="flex gap-1 ">
                        <h4>{friend?.friend?.age},</h4>
                        <h4>{friend?.friend?.gender} </h4>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => {
                    if (user && friend) {
                      //TODO: make it responsive
                      deleteFriendHandler(user._id, friend.friend._id);
                    }
                  }}
                >
                  Delete
                </Button>
              </div>
            ))
          ) : (
            <p className="font-medium text-secondary-foreground/70">
              You have no mates yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mates;
