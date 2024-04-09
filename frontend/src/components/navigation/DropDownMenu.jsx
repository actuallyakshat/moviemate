import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton } from "@clerk/clerk-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useClerk } from "@clerk/clerk-react";
import { ModeToggle } from "./ThemeToggler";
import { Link } from "react-router-dom";
import { useAtomValue } from "jotai";
import { userAtom } from "@/lib/store/store";
import { useEffect } from "react";

const DropDownMenu = () => {
  const userFromStore = useAtomValue(userAtom);
  const { user, signOut } = useClerk();
  const profileImg = user?.imageUrl || import.meta.env.VITE_DUMMY_PROFILE;
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={profileImg} />
          <AvatarFallback>Pfp</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user.fullName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to={`/profile/${userFromStore?._id}`} className="w-full">
            Your Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/settings" className="w-full">
            Account Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-0">
          <ModeToggle />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <p className="w-full" onClick={signOut}>
            Logout
          </p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownMenu;
