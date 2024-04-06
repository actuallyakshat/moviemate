import React, { useEffect } from "react";

const Content = ({ selectedConversation }) => {
  useEffect(() => {
    console.log(selectedConversation);
  }, [selectedConversation]);
  return (
    <div className="pl-[25rem]">
      <div className="w-full h-16">
        <h1>{selectedConversation?.fullName}</h1>
      </div>
      <h1>Chat</h1>
      <div></div>
      <form>
        <input type="text" placeholder="Enter your message" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Content;
