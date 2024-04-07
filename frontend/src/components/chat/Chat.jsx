import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import Content from "./Content";
import { useAtomValue } from "jotai";
import { userAtom } from "@/lib/store/store";
const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const user = useAtomValue(userAtom);

  useEffect(() => {
    const fetchConversations = async () => {
      console.log(user?._id);
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASEURL}/friend/getAllFriends`,
          {
            userId: user?._id,
          }
        );
        console.log(res);
        setConversations(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      fetchConversations();
    }
  }, [user]);
  return (
    <div className="pt-16">
      <Sidebar
        conversations={conversations}
        setSelectedConversation={setSelectedConversation}
        userId={user?._id}
      />
      <Content selectedConversation={selectedConversation} userId={user?._id} />
    </div>
  );
};

export default Chat;
