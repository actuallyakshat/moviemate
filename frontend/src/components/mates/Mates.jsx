import { getPendingRequest } from "@/actions/friendActions";
import { userAtom } from "@/lib/store/store";
import { useAtomValue } from "jotai";
import { useEffect } from "react";

const Mates = () => {
  const user = useAtomValue(userAtom);
  useEffect(() => {
    const getRequests = async () => {
      const response = await getPendingRequest(user?._id);
      if (response.success) {
        console.log(response);
      }
    };
    getRequests();
  }, []);

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
