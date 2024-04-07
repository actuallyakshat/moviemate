import { useEffect, useState } from "react";
import { Input } from "../ui/input";
const Sidebar = ({ conversations, setSelectedConversation }) => {
  console.log(conversations);

  return (
    <div className="fixed min-h-[calc(100vh-64px)] bottom-0 left-0 max-w-[25rem] w-full p-3 border-r z-[1000]  ">
      <Input placeholder="Search friends" />
      <div className="space-y-2 mt-4">
        {conversations.map((conversation) => (
          <div
            key={conversation.friend._id}
            className="items-center gap-3 flex bg-zinc-200 rounded-lg cursor-pointer"
          >
            {/* <div>
              <img
                src={friend.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
            </div> */}
            <div
              onClick={() => setSelectedConversation(conversation)}
              className="w-full h-full p-3 rounded-lg"
            >
              <h1 className="font-bold">{conversation.friend.fullName}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
