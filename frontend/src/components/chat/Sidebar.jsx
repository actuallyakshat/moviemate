import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import LoadingSpinner from "../Loading/LoadingSpinner";

const Sidebar = ({
  conversations,
  setSelectedConversation,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  loading,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredConversations, setFilteredConversations] = useState([]);

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
      className={`fixed bg-background h-full lg:max-h-[calc(100vh-64px)] bottom-0 left-0 lg:max-w-[25rem] w-full p-3 border-r z-[1000] ${
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
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
                className="items-center gap-3 flex bg-zinc-50 hover:bg-zinc-200 transition-colors border shadow-md dark:bg-zinc-700 dark:hover:bg-zinc-800 rounded-lg cursor-pointer"
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
                  <h1 className="font-bold">
                    {conversation?.friend?.fullName}
                  </h1>
                </div>
              </div>
            ))
          ) : (
            <p className="font-semibold text-secondary-foreground/70 text-center pt-10 px-6">
              You currently don&apos;t have any mates to chat with
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
