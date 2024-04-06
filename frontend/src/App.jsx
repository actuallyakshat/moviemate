import { Navbar } from "./components/navigation/Navbar";
import Routes from "./components/navigation/Routes";

function App() {
  return (
    <div className="min-h-screen h-full font-Inter">
      <Navbar />
      <div className="pt-20 container">
        <Routes />
      </div>
    </div>
  );
}

export default App;
