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
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true);

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
        setLoading(false);
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
    <div className="pt-16 flex min-h-screen">
      <Sidebar
        loading={loading}
        conversations={conversations}
        setSelectedConversation={setSelectedConversation}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      {selectedConversation ? (
        <Content
          selectedConversation={selectedConversation}
          userId={user?._id}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      ) : (
        <p className="lg:pl-[27rem] px-4 text-2xl w-fit mx-auto pt-8 font-black text-foreground/80">
          Please select a conversation
        </p>
      )}
    </div>
  );
};

export default Chat;
