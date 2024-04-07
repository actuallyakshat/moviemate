import { useEffect, useState } from "react";
import { getPendingRequest } from "../../actions/friendActions";
import { useAtomValue } from "jotai";
import { userAtom } from "../../lib/store/store";
import { set } from "react-hook-form";
import { Button } from "../ui/button";

const Mates = () => {
  const user = useAtomValue(userAtom);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  useEffect(() => {
    if (user) {
      getPendingRequest(user._id, setIncomingRequests, setOutgoingRequests);
    }
  }, [user]);
  console.log("incomingRequests", incomingRequests[0]);
  console.log("outgoingRequests", outgoingRequests);
  return (
    <div className="pt-20 w-full">
      <div className="grid grid-col-1 md:grid-cols-2 gap-4 max-w-7xl w-full mx-auto p-4">
        <div className="col-span-1">
          <h1 className="text-3xl font-semibold">Incoming Requests</h1>
          <div className="pr-20 mt-5">
            {incomingRequests.length > 0 ? (
              incomingRequests.map((friend) => (
                <div
                  key={friend.friend._id}
                  className="p-2 flex items-center justify-between gap-4 border rounded-xl px-4"
                >
                  <div className="flex gap-4">
                    <img
                      src="https://is1-ssl.mzstatic.com/image/thumb/AMCArtistImages116/v4/74/9b/d1/749bd157-c81b-2c54-9940-16c13cecaa95/e5e09754-1d06-4a09-b2e1-6c24f77e0157_file_cropped.png/486x486bb.png"
                      className="w-14 h-14 rounded-full"
                    />
                    <div>
                      <h1 className="font-semibold">
                        {friend.friend.fullName}
                      </h1>
                      <div className="flex items-center gap-1 font-medium text-secondary-foreground/50">
                        <h4>Hello</h4>
                        <h4>World</h4>
                      </div>
                    </div>
                  </div>
                  <div className="space-x-3">
                    <Button variant="ghost" className="hover:text-red-500">
                      Decline
                    </Button>
                    <Button variant="ghost" className="hover:text-green-500">
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
          <div className="pr-20 mt-5">
            {outgoingRequests.length > 0 ? (
              outgoingRequests.map((friend) => (
                <div
                  key={friend.friend._id}
                  className="p-2 flex items-center justify-between gap-4 border rounded-xl px-4"
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
                        {/* <h4>{friend.friend.age}</h4>
               <h4>{friend.friend.gender}</h4> */}
                        <h4>Hello, </h4>
                        <h4>World</h4>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" className="hover:text-red-500">
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
      <div className="p-4">
        <h1 className="text-3xl font-semibold max-w-7xl mx-auto">All Mates</h1>
      </div>
    </div>
  );
};

export default Mates;
