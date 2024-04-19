import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import LoadingSpinner from "../Loading/LoadingSpinner";

const Sidebar = ({
  conversations,
  setSelectedConversation,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  loading,
  selectedConversation,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredConversations, setFilteredConversations] = useState([]);

  useEffect(() => {
    // Filter conversations based on searchQuery
    const filtered = conversations.filter((conversation) =>
      conversation.friend.fullName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    );
    setFilteredConversations(filtered);
  }, [searchQuery, conversations]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div
      className={`fixed bottom-0 left-0 z-[1000] h-full w-full border-r bg-background p-3 pt-14 lg:max-h-[calc(100vh-64px)] lg:max-w-[25rem] lg:pt-3 ${
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div
        className="absolute right-7 top-3 block font-black lg:hidden"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        X
      </div>
      <Input
        className="mx-auto max-w-2xl"
        placeholder="Search friends"
        value={searchQuery}
        onChange={handleInputChange}
      />
      {loading ? (
        <div className="flex h-full w-full items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="mt-4 space-y-2">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conversation) => (
              <div
                key={conversation?.friend._id}
                className={`${
                  selectedConversation?.friendshipId ==
                  conversation?.friendshipId
                    ? "bg-gray-200/70 dark:bg-gray-700"
                    : "bg-zinc-50 hover:bg-zinc-100 dark:bg-gray-600 hover:dark:bg-gray-700"
                } flex cursor-pointer items-center  gap-3 rounded-lg border shadow-md transition-colors`}
              >
                <div
                  onClick={() => {
                    setSelectedConversation(conversation);
                    if (window.innerWidth <= 1024) {
                      setIsMobileMenuOpen(false);
                    }
                  }}
                  className="h-full w-full rounded-lg p-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={conversation?.friend?.profileImage}
                      alt="pfp"
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="my-auto h-fit">
                      <h1 className="font-bold">
                        {conversation?.friend?.fullName}
                      </h1>
                      <div className="flex gap-1 text-sm font-medium text-foreground/70">
                        <h3>{conversation?.friend.age},</h3>
                        <h3>{conversation?.friend.gender}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="px-6 pt-6 text-center text-xl font-semibold text-secondary-foreground/70">
              You currently don&apos;t have any mates to chat with
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
