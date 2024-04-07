import { Routes as MainRoutes, Route } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import Chat from "../chat/Chat";
import Mates from "../mates/Mates";
import Landing from "../landing/Landing";
import { AccountSettings } from "../AccountSettings/AccountSettings";
import MoviePage from "../movie/MoviePage";
import Profile from "../profile/Profile";
const Routes = () => {
  return (
    <MainRoutes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/mates" element={<Mates />} />
      <Route path="/settings" element={<AccountSettings />} />
      <Route path="/profile/:id" element={<Profile/>} />
      <Route path="/movie" element={<MoviePage />} />
    </MainRoutes>
  );
};

export default Routes;
