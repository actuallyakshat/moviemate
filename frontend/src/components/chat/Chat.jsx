import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import Content from "./Content";
const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/v1/friend/getAllFriends",
          {
            userId: "66115a5e50b2b8642e3aea5a",
          }
        );
        console.log(res.data.data);
        setConversations(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchConversations();
  }, []);
  return (
    <div className="pt-16">
      <Sidebar
        conversations={conversations}
        setSelectedConversation={setSelectedConversation}
      />
      <Content selectedConversation={selectedConversation} />
    </div>
  );
};

export default Chat;
