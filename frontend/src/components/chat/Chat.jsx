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
import { userAtom } from "@/lib/store/store";
import { useAtomValue } from "jotai";
import Sidebar from "./Sidebar";
const Chat = () => {
  const user = useAtomValue(userAtom);
  const [messages, setMessages] = useState([]);
  const [messagesList, setMessagesList] = useState([]);
  const messagesRef = collection(db, "messages");
  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", "friendshipid"),
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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (messages === "") return;
    await addDoc(messagesRef, {
      message: messages,
      timestamp: serverTimestamp(),
      user: user.fullName,
      room: "friendshipid",
    });
    setMessages("");
  };

  return (
    <div className="pt-20">
      <Sidebar />
      <div className="pl-[28rem]">
        <h1>Chat</h1>
        <div>
          {messagesList.map((message) => (
            <div key={message.id}>
              <span>{message.user} says: </span>
              <span>{message.message}</span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your message"
            onChange={(e) => setMessages(e.target.value)}
            value={messages}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
