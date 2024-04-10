import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const MateButton = ({ currentUser, user }) => {
  const navigate = useNavigate();
  const isFriend = currentUser?.friends?.some(
    (friend) => friend.user2 == user._id
  );

  // If user is not a friend, show "Send Request" button
  if (!isFriend) {
    return null;
  }

  // Find the friendship status of the user
  const friendship = currentUser?.friends?.find(
    (friend) => friend.user2 === user._id
  );

  if (friendship?.status === "pending") {
    return <p className="text-sm p-2 font-medium">Request Sent</p>;
  }

  // If the friendship status is accepted, show "Chat" button
  if (friendship?.status === "accepted") {
    return (
      <Button variant="ghost" onClick={() => navigate(`/chat`)}>
        Chat
      </Button>
    );
  }

  // Default return if conditions don't match
  return null;
};

export default MateButton;
