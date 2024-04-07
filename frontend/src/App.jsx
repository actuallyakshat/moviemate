import { useEffect, useState } from "react";
import { Navbar } from "./components/navigation/Navbar";
import Routes from "./components/navigation/Routes";
import { Toaster } from "./components/ui/toaster";
import { getUserDetails } from "./actions/userActions";
import { useAuth, useClerk } from "@clerk/clerk-react";
import { userAtom } from "./lib/store/store";
import { useAtom, useSetAtom } from "jotai";
import Loading from "./components/Loading/Loading";
import { useNavigate } from "react-router-dom";

function App() {
  const { user } = useClerk();
  const { isLoaded } = useAuth();
  const [loading, setLoading] = useState(true);
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const getDetails = async () => {
      if (isLoaded && user) {
        const response = await getUserDetails(
          user.fullName,
          user.primaryEmailAddress.emailAddress,
          setUser
        );
        if (response.success) {
          setLoading(false);
        } else {
          setLoading(false);
          if (window.location.origin != "/") {
            setLoading(false);
            navigate("/");
          }
        }
      } else {
        if (isLoaded && !user) {
          console.log("user nahi mila");
          if (window.location.origin != "/") {
            setLoading(false);
            navigate("/");
          }
        }
      }
    };
    getDetails();
  }, [user, isLoaded]);

  return (
    <div className="min-h-screen w-full h-full font-Inter">
      <Toaster />
      <Navbar />
      {loading && <Loading />}
      <Routes />
    </div>
  );
}

export default App;
