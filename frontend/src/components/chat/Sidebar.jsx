import { useEffect, useState } from "react";
import { Input } from "../ui/input";
const Sidebar = ({ conversations, setSelectedConversation }) => {
  const friends = [
    {
      id: 1,
      fullName: "Akshat Dubey",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      lastMessage: "Hello, my name is akshat dubey",
      friendshipId: "friendshipid1",
    },
    {
      id: 2,
      fullName: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      lastMessage: "Hello, my name is John Doe",
      friendshipId: "friendshipid2",
    },
    {
      id: 3,
      fullName: "Jane Doe",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      lastMessage: "Hello, my name is Jane Doe",
      friendshipId: "friendshipid3",
    },
  ];

  return (
    <div className="fixed min-h-[calc(100vh-64px)] bottom-0 left-0 max-w-[25rem] w-full p-3 border-r z-[1000]">
      <Input placeholder="Search friends" />
      <div className="space-y-2 mt-4">
        {conversations.map((friend) => (
          <div
            key={friend._id}
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
              onClick={() => setSelectedConversation(friend)}
              className="w-full h-full p-3 rounded-lg"
            >
              <h1 className="font-bold">{friend.fullName}</h1>
              {/* <p className="truncate text-zinc-800">{friend.lastMessage}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
