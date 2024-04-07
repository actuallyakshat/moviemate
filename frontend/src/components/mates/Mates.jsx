import { useEffect, useState } from "react";
import { getPendingRequest } from "../../actions/friendActions";
import { useAtomValue } from "jotai";
import { userAtom } from "../../lib/store/store";
import { set } from "react-hook-form";

const Mates = () => {
  const user = useAtomValue(userAtom);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  useEffect(() => {
    if(user){
      getPendingRequest(user._id, setIncomingRequests, setOutgoingRequests);
    }
  }, [user])
  console.log('incomingRequests', incomingRequests);
  console.log('outgoingRequests', outgoingRequests);
  return (
    <div className="pt-20 w-full">
      <div className="grid grid-col-1 md:grid-cols-2 max-w-7xl w-full mx-auto p-4">
        <div className="col-span-1">
          <h1 className="text-3xl font-semibold">Incoming Requests</h1>
        </div>
        <div>
          <h1 className="text-3xl font-semibold">Outgoing Requests</h1>
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
