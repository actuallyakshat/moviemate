import { useEffect, useState } from "react";
import { Input } from "../ui/input";

const Sidebar = ({ conversations, setSelectedConversation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredConversations, setFilteredConversations] = useState([]);

  useEffect(() => {
    // Filter conversations based on searchQuery
    const filtered = conversations.filter((conversation) =>
      conversation.friend.fullName
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setFilteredConversations(filtered);
  }, [searchQuery, conversations]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="fixed min-h-[calc(100vh-64px)] bottom-0 left-0 max-w-[25rem] w-full p-3 border-r z-[1000]">
      <Input
        placeholder="Search friends"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <div className="space-y-2 mt-4">
        {filteredConversations.map((conversation) => (
          <div
            key={conversation?.friend._id}
            className="items-center gap-3 flex bg-zinc-50 hover:bg-zinc-200 transition-colors border shadow-md dark:bg-zinc-700 dark:hover:bg-zinc-800 rounded-lg cursor-pointer"
          >
            <div
              onClick={() => setSelectedConversation(conversation)}
              className="w-full h-full p-3 rounded-lg"
            >
              <h1 className="font-bold">{conversation?.friend?.fullName}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
