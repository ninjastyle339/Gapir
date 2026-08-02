
import SignUp from "./SignUp";
import Login from "./Login";
import Home from "./Home"
import Chat from "./Chat";
import AddFriend from "./AddFriend";
import PendingRequests from "./PendingRequests";
import Settings from "./Settings";
import AccountSettings from "./AccountSettings";
import ProfileSettings from "./ProfileSettings";
import AppearanceSettings from "./AppearanceSettings";
import {Routes, Route} from "react-router";
import Verify from "./Verify";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import ProtectedRoute from "./ProtectedRoute";
function App() {

  return (
    
      <div>
        <Routes>
          <Route path="/register" element={<SignUp />} />
          <Route path = "/login" element={<Login />} />
          <Route path = "/verify" element={<Verify />} />
          <Route path = "/forgot-password" element={<ForgotPassword />} />
          <Route path = "/reset-password" element={<ResetPassword />} />
          <Route element={<ProtectedRoute><Home /></ProtectedRoute>} >
              <Route path="/" element={<Chat />} />
              <Route path="/add-friend" element={<AddFriend />} />
              <Route path="/rooms/:roomId" element={<Chat />} />
              <Route path="/pending-requests" element={<PendingRequests />} />
          </Route>
          <Route path = "/settings" element = {<ProtectedRoute><Settings /></ProtectedRoute>} >
                <Route path = "/settings/account" element={<AccountSettings />} />
                <Route path = "/settings/profile" element={<ProfileSettings />} />
                <Route path = "/settings/appearance" element={<AppearanceSettings />} />
          </Route>
        </Routes>
      </div>
  )
}

export default App
