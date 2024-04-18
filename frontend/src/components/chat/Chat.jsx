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
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASEURL}/friend/getAllFriends`,
          {
            userId: user?._id,
          }
        );
        setLoading(false);
        setConversations(res.data.data);
      } catch (error) {
        console.error(error);
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
        selectedConversation={selectedConversation}
      />
      {selectedConversation ? (
        <Content
          selectedConversation={selectedConversation}
          userId={user?._id}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      ) : (
        <p
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:pl-[27rem] underline lg:no-underline px-4 text-2xl w-fit mx-auto pt-8 font-black text-foreground/80"
        >
          Please select a conversation
        </p>
      )}
    </div>
  );
};

export default Chat;
