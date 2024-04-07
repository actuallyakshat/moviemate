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

const Chat = ({ selectedConversation, userId }) => {
  const friendshipId = selectedConversation.friendshipId;
  const user = useAtomValue(userAtom);
  const [messages, setMessages] = useState([]);
  const [messagesList, setMessagesList] = useState([]);
  console.log(messagesList);
  const messagesRef = collection(db, "messages");
  console.log("om", selectedConversation);

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
    <div className="flex flex-col justify-between w-full py-8 px-12 pl-[30rem]">
      {selectedConversation ? (
        <>
          <div className="w-full">
            <h1 className="font-bold text-2xl">
              Chat with {selectedConversation?.friend?.fullName}
            </h1>
          </div>

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
                      ? "bg-blue-300 dark:bg-blue-600 rounded-lg p-2 max-w-[75%]"
                      : "bg-gray-300 dark:bg-gray-600 rounded-lg p-2 max-w-[75%]"
                  }
                >
                  <span className="font-bold">
                    {message.user === user._id
                      ? "You"
                      : selectedConversation?.friend?.fullName}{" "}
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
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold">Please select a conversation</h1>
        </>
      )}
    </div>
  );
};

export default Chat;
