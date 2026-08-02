import SideBar from "./SideBar";
import Chat from "./Chat"
import { useState } from "react";
import { Outlet, useParams, useLocation } from "react-router";
import useIsMobile from "./useIsMobile";



const Home = () => {
    const [activeRoomId, setActiveRoomId] = useState(null);

    const location = useLocation();
    const isMobile = useIsMobile();
    const isIndex = location.pathname === "/";
    const showSidebar = !isMobile || isIndex;
    const showChat = !isMobile || !isIndex;

    return (
        <div className="homepage-container">
            {showSidebar && <SideBar onSelectRoom={setActiveRoomId} />}
            {showChat && <Outlet />}
        </div>
    )
}
export default Home;