import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
function App() {
  return (
    <div>
      <h1 className="text-3xl">Hello World</h1>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <Button>Button</Button>
    </div>
  );
}

export default App;
