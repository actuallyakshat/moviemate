import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSocketContext } from "@/context/SocketContext";
const Content = ({ selectedConversation, userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState([]);
  const { socket } = useSocketContext();
  useEffect(() => {
    if (selectedConversation) {
      //getMessages
      const messages = axios
        .post(`${import.meta.env.VITE_BASEURL}/chat/get`, {
          userId,
          receiverId: selectedConversation._id,
        })
        .then((res) => {
          console.log(res);
          setMessages(res.data.messages);
        })
        .catch((err) => console.log("Error =", err));
    }
    socket?.on("newMessage", (newMessage) => {
      setMessages([...messages], { message: newMessage });
    });
    return () => socket?.off("newMessage");
  }, [selectedConversation, socket]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessages([...messages, { message: newMessage }]);
    socket.emit("newMessage", newMessage);
    await axios
      .post(`${import.meta.env.VITE_BASEURL}/chat/send`, {
        senderId: userId,
        receiverId: selectedConversation._id,
        message: newMessage,
      })
      .then(() => console.log("Message sent"));
    setNewMessage("");
  };
  return (
    <div className="pl-[25rem]">
      <div className="w-full h-16">
        <h1>{selectedConversation?.fullName}</h1>
      </div>
      <h1>Chat</h1>
      <div className="h-[40rem] bg-zinc-100">
        {messages.map((message) => (
          <div key={message._id}>{message.message}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Content;
