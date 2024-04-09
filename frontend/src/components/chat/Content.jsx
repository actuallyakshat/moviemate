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
    <div className="flex flex-col justify-between w-full py-3 px-4 lg:px-12 lg:pl-[27rem]">
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
          <div>
            <div className="py-4 space-y-2 max-h-[90%] overflow-y-auto no-scrollbar">
              {messagesList.map((message) => (
                <div
                  key={message.id}
                  className={`
              ${
                message.user === user._id
                  ? "flex justify-end"
                  : "flex justify-start"
              } `}
                >
                  <div
                    className={
                      message.user === user._id
                        ? "bg-primary text-white rounded-lg text-sm p-3 max-w-[75%]"
                        : "bg-gray-300 dark:bg-gray-600 rounded-lg p-2 max-w-[75%]"
                    }
                  >
                    <span className="font-bold">
                      {message.user === user._id
                        ? "You"
                        : selectedConversation?.friend?.fullName?.split(
                            " "
                          )[0]}{" "}
                      :{" "}
                    </span>
                    <span>{message.message}</span>
                  </div>
                </div>
              ))}
            </div>
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
