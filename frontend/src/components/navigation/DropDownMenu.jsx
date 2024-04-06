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

const DropDownMenu = () => {
  const { user, signOut } = useClerk();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user.fullName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Your Profile</DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/settings">Account Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
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
