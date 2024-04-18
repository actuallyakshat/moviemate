import { Link, useLocation } from "react-router-dom";
import DropDownMenu from "./DropDownMenu";
import { SignedIn, SignedOut, useClerk } from "@clerk/clerk-react";
import { Button } from "../ui/button";
import SearchModal from "./SearchModal";
import { useState } from "react";
export function Navbar() {
  const { pathname } = useLocation();
  const [modal, setModal] = useState(false);
  const { openSignIn } = useClerk();
  return (
    <nav className="bg-background w-full h-16 border-b border-foreground/20 flex items-center justify-center fixed top-0 z-[995]">
      {modal && <SearchModal setModal={setModal} />}
      <div className="max-w-7xl px-3 w-full flex items-center justify-between">
        <Link
          to="/"
          className="text-md md:text-xl text-2xl pl-2 md:pl-0 font-black"
        >
          <span className="hidden md:inline">
            Movie <span className="text-primary">Mate</span>
          </span>{" "}
          🎥
        </Link>
        <>
          <SignedOut>
            <Button variant="ghost" onClick={openSignIn}>
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center justify-center gap-4">
              {pathname === "/dashboard" && (
                <h1
                  onClick={() => setModal(true)}
                  className="cursor-pointer font-semibold transition-colors"
                >
                  Search
                </h1>
              )}
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
      } font-semibold transition-colors`}
      to={url}
    >
      {children}
    </Link>
  );
}
