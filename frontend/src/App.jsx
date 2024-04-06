import { Navbar } from "./components/navigation/Navbar";
import Routes from "./components/navigation/Routes";
import { Toaster } from "./components/ui/toaster";

function App() {
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
