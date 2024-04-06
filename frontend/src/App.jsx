import { Navbar } from "./components/navigation/Navbar";
import Routes from "./components/navigation/Routes";

function App() {
  return (
    <div className="min-h-screen w-full h-full font-Inter">
      <Navbar />
      <Routes />
    </div>
  );
}

export default App;
