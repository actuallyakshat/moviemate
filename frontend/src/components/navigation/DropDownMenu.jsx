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
  const profileImg = userFromStore?.profileImage;
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={profileImg}
            className="object-cover aspect-square"
          />
          <AvatarFallback></AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user.fullName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-0">
          <Link
            to={`/profile/${userFromStore?._id}`}
            className="w-full px-2 py-1.5"
          >
            Your Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/settings" className="w-full px-2 py-1.5 cursor-pointer">
            Account Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-0 cursor-pointer">
          <ModeToggle />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <p className="w-full cursor-pointer" onClick={signOut}>
            Logout
          </p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownMenu;
