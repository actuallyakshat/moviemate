import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/functions/firebaseconfig";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAtomValue } from "jotai";
import { userAtom } from "@/lib/store/store";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { formatDateTimeFromSeconds } from "@/lib/functions/time";

const Content = ({ selectedConversation, userId, setIsMobileMenuOpen }) => {
  const friendshipId = selectedConversation.friendshipId;
  const navigate = useNavigate();
  const user = useAtomValue(userAtom);
  const [messages, setMessages] = useState([]);
  const [messagesList, setMessagesList] = useState([]);
  console.log(messagesList);
  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", friendshipId),
      orderBy("timestamp")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessagesList(messages);
      console.log(messagesList);
    });
    return () => unsubscribe();
  }, [selectedConversation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (messages === "") return;
    await addDoc(messagesRef, {
      message: messages,
      timestamp: serverTimestamp(),
      user: userId,
      room: friendshipId,
    });
    setMessages("");
  };

  return (
    <div className="flex flex-col relative justify-between w-full py-3 px-4 lg:px-12 lg:pl-[27rem]">
      {selectedConversation && (
        <>
          <div className="w-full">
            <div className="w-full fixed top-16 flex items-center justify-between bg-background px-5 left-0 lg:left-[25rem] h-14 border-b border-foreground/20">
              <div className="space-x-3 flex items-center">
                <Button
                  className="flex items-center gap-1 font-semibold lg:hidden -ml-2"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <IoMdArrowBack className="size-5" />
                </Button>
                <img
                  src={selectedConversation?.friend?.profileImage}
                  alt=""
                  className="w-9 h-9 rounded-full"
                />
                <h1
                  className="font-semibold text-lg cursor-pointer"
                  onClick={() => {
                    navigate(`/profile/${selectedConversation?.friend?._id}`);
                  }}
                >
                  {selectedConversation?.friend?.fullName}
                </h1>
              </div>
            </div>
          </div>
          <div className="py-10">
            <div className="py-4 lg:px-10 space-y-2 h-full flex flex-col justify-end overflow-y-auto no-scrollbar">
              {messagesList.map(
                (message) =>
                  message?.timestamp?.seconds && (
                    <div
                      key={message?.id}
                      className={`
        ${
          message?.user === user._id ? "flex justify-end" : "flex justify-start"
        } 
      `}
                    >
                      <div
                        className={
                          message?.user === user._id
                            ? "bg-primary text-white rounded-lg text-sm px-3 py-2 max-w-[50%]"
                            : "bg-gray-50 text-foreground dark:bg-gray-600 rounded-lg p-2 max-w-[50%]"
                        }
                      >
                        <span>{message?.message}</span>
                        <p className="text-[12px] text-right">
                          {message?.timestamp?.seconds
                            ? formatDateTimeFromSeconds(
                                message?.timestamp?.seconds
                              )
                            : ""}
                        </p>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>

          <div className="fixed bg-background left-0 px-8 lg:pl-[28rem] w-full bottom-0 pb-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter your message"
                onChange={(e) => setMessages(e.target.value)}
                value={messages}
              />
              <Button type="submit">Send</Button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Content;
