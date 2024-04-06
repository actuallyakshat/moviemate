import { Routes as MainRoutes, Route } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import Chat from "../chat/Chat";
import Mates from "../mates/Mates";
const Routes = () => {
  return (
    <MainRoutes>
      <Route path="/" />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/mates" element={<Mates />} />
      <Route path="/settings" element={<div>settings</div>} />
      <Route path="/profile/:id" element={<div>profile</div>} />
      <Route path="/movie/:id" element={<div>movie</div>} />
    </MainRoutes>
  );
};

export default Routes;
