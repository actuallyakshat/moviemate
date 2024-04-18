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
  // bg-zinc-50 hover:bg-zinc-200 dark:bg-zinc-700 dark:hover:bg-zinc-800
  useEffect(() => {
    console.log("selected", selectedConversation);
    console.log("conversation", conversations);
    console.log("id 1: ", conversations[0]?.friendshipId);
    console.log("id 2:", selectedConversation?.friendshipId);
  }, [selectedConversation]);

  // useEffect(() => {
  //   setIsMobileMenuOpen(window.innerWidth >= 1024);

  //   const handleResize = () => {
  //     setIsMobileMenuOpen(window.innerWidth >= 1024);
  //   };
  //   window.addEventListener("resize", handleResize);

  //   // Cleanup the event listener on component unmount
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, [setIsMobileMenuOpen]);

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
    <div
      className={`fixed bg-background h-full lg:max-h-[calc(100vh-64px)] bottom-0 left-0 lg:max-w-[25rem] pt-14 w-full p-3 border-r z-[1000] ${
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div
        className="absolute block lg:hidden top-3 font-black right-7"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        X
      </div>
      <Input
        className="max-w-2xl mx-auto"
        placeholder="Search friends"
        value={searchQuery}
        onChange={handleInputChange}
      />
      {loading ? (
        <div className="w-full h-full flex items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="space-y-2 mt-4">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conversation) => (
              <div
                key={conversation?.friend._id}
                className={`${
                  selectedConversation?.friendshipId ==
                  conversation?.friendshipId
                    ? "bg-gray-200/70 dark:bg-gray-700"
                    : "bg-zinc-50 hover:bg-zinc-100 dark:bg-gray-600 hover:dark:bg-gray-700"
                } items-center gap-3 flex  transition-colors border shadow-md rounded-lg cursor-pointer`}
              >
                <div
                  onClick={() => {
                    setSelectedConversation(conversation);
                    if (window.innerWidth <= 1024) {
                      setIsMobileMenuOpen(false);
                    }
                  }}
                  className="w-full h-full p-3 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={conversation?.friend?.profileImage}
                      alt="pfp"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="h-fit my-auto">
                      <h1 className="font-bold">
                        {conversation?.friend?.fullName}
                      </h1>
                      <div className="text-sm font-medium text-foreground/70 flex gap-1">
                        <h3>{conversation?.friend.age},</h3>
                        <h3>{conversation?.friend.gender}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="font-semibold text-xl text-secondary-foreground/70 text-center pt-6 px-6">
              You currently don&apos;t have any mates to chat with
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
