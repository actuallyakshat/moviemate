import { Link, useLocation } from "react-router-dom";
import DropDownMenu from "./DropDownMenu";
import { SignedIn, SignedOut, useClerk } from "@clerk/clerk-react";
import { Button } from "../ui/button";
export function Navbar() {
  const { openSignIn } = useClerk();
  return (
    <nav className="bg-background w-full h-16 border-b border-foreground/20 flex items-center justify-center fixed top-0 z-[995]">
      <div className="max-w-7xl px-3 w-full flex items-center justify-between">
        <Link to="/" className="text-md md:text-xl font-bold">
          Movie Mate
        </Link>
        <>
          <SignedOut>
            <Button variant="outline" onClick={openSignIn}>
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center justify-center gap-4">
              <NavLink url="/dashboard">Home</NavLink>
              <NavLink url="/mates">Mates</NavLink>
              <NavLink url="/chat">Chat</NavLink>
              <DropDownMenu />
            </div>
          </SignedIn>
        </>
      </div>
    </nav>
  );
}

export function NavLink({ url, children }) {
  const { pathname } = useLocation();
  // const pathname = window.location.pathname;
  return (
    <Link
      className={`${
        pathname === url ? "text-primary" : "text-foreground hover:underline"
      } font-medium transition-colors`}
      to={url}
    >
      {children}
    </Link>
  );
}
