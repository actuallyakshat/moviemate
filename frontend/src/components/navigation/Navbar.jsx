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
    <nav className="fixed top-0 z-[995] flex h-16 w-full items-center justify-center border-b border-foreground/20 bg-background">
      {modal && <SearchModal setModal={setModal} />}
      <div className="flex w-full max-w-7xl items-center justify-between px-3">
        <Link
          to="/"
          className="text-md pl-2 text-2xl font-black md:pl-0 md:text-xl"
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
