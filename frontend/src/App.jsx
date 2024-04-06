import { useEffect } from "react";
import { Navbar } from "./components/navigation/Navbar";
import Routes from "./components/navigation/Routes";
import { Toaster } from "./components/ui/toaster";
import { getUserDetails } from "./actions/userActions";
import { useClerk } from "@clerk/clerk-react";
import { userAtom } from "./lib/store/store";
import { useSetAtom } from "jotai";

function App() {
  const {user} = useClerk()
  const setUser = useSetAtom(userAtom);
  useEffect(() => {
    if(user){
      getUserDetails(user.fullName, user.primaryEmailAddress.emailAddress, setUser);
    }
  }, [user])
  
  return (
    <div className="min-h-screen h-full font-Inter">
      <Toaster />
      <Navbar />
      <div className="pt-20 container">
        <Routes />
      </div>
    </div>
  );
}

export default App;
