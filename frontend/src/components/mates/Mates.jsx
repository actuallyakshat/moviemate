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

const Mates = () => {
  const user = useAtomValue(userAtom);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  console.log(friends);
  useEffect(() => {
    if (user) {
      getFriends(user._id, setFriends);
      getPendingRequest(user._id, setIncomingRequests, setOutgoingRequests);
    }
  }, [user]);
  const AcceptFriendHandler = async (friend) => {
    const response = await acceptFriendRequest(user._id, friend._id);
    if (response.success) {
      //change the friend state
      setFriends(friends.filter((f) => f.friend._id !== friend._id));
    } else {
      console.log("Error accepting friend request", response.message);
    }
  };
  console.log("incomingRequests", incomingRequests[0]);
  console.log("outgoingRequests", outgoingRequests);
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
                      src="https://is1-ssl.mzstatic.com/image/thumb/AMCArtistImages116/v4/74/9b/d1/749bd157-c81b-2c54-9940-16c13cecaa95/e5e09754-1d06-4a09-b2e1-6c24f77e0157_file_cropped.png/486x486bb.png"
                      className="w-14 h-14 rounded-full"
                    />
                    <div>
                      <h1 className="font-semibold">
                        {friend.friend.fullName}
                      </h1>
                      <div className="flex items-center gap-1 font-medium text-secondary-foreground/50">
                        <h4>{friend.friend.age}, </h4>
                        <h4>{friend.friend.gender}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="space-x-3 flex">
                    <Button
                      variant="ghost"
                      className="hover:text-red-500"
                      onClick={() =>
                        declineFriendRequest(user._id, friend.friend._id)
                      }
                    >
                      Decline
                    </Button>
                    <Button
                      variant="ghost"
                      className="hover:text-green-500"
                      onClick={() => AcceptFriendHandler(friend.friend)}
                    >
                      Accept
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="font-medium">There are no incoming requests</p>
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
                  className="p-2 shadow-md flex items-center justify-between gap-4 border rounded-xl px-4"
                >
                  <div className="flex gap-3">
                    <img
                      src="https://is1-ssl.mzstatic.com/image/thumb/AMCArtistImages116/v4/74/9b/d1/749bd157-c81b-2c54-9940-16c13cecaa95/e5e09754-1d06-4a09-b2e1-6c24f77e0157_file_cropped.png/486x486bb.png"
                      className="w-14 h-14 rounded-full"
                    />
                    <div>
                      <h1 className="font-semibold">
                        {friend.friend.fullName}
                      </h1>
                      <div className="flex gap-1 font-medium text-secondary-foreground/50">
                        <h4>{friend.friend.age}</h4>
                        <h4>{friend.friend.gender}</h4>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="hover:text-red-500"
                    onClick={() =>
                      cancelFriendRequest(user._id, friend.friend._id)
                    }
                  >
                    Cancel
                  </Button>
                </div>
              ))
            ) : (
              <p className="font-medium">There are no outgoing requests</p>
            )}
          </div>
        </div>
      </div>
      <hr className="my-2" />
      <div className="p-4 max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold max-w-7xl mx-auto">All Mates</h1>
        <div className="pt-6 space-y-2">
          {friends?.length > 0 ? (
            friends?.map((friend) => (
              <div
                key={friend._id}
                className="p-2 shadow-md flex items-center justify-between gap-4 border rounded-xl px-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src="https://is1-ssl.mzstatic.com/image/thumb/AMCArtistImages116/v4/74/9b/d1/749bd157-c81b-2c54-9940-16c13cecaa95/e5e09754-1d06-4a09-b2e1-6c24f77e0157_file_cropped.png/486x486bb.png"
                    alt="pfp"
                    className="w-14 h-14 rounded-full"
                  />
                  <div className="flex flex-col">
                    <h3 className="font-semibold">
                      {friend?.friend?.fullName}
                    </h3>
                    <div className="flex gap-1">
                      <h3>{friend?.friend?.age},</h3>
                      <h3>{friend?.friend?.gender} </h3>
                    </div>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => {
                    if (user && friend) {
                      removeFriend(user._id, friend.friend._id);
                    }
                    // console.log(user._id);
                    // console.log(friend.friend._id);
                    // removeFriend(user._id, friend.friend._id);
                  }}
                >
                  Delete
                </Button>
              </div>
            ))
          ) : (
            <p className="font-medium">There are no friends</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mates;
