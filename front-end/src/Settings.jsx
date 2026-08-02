import { UserIcon, IdIcon, PaintIcon, BackIcon } from "./Icons";
import { Link } from "react-router";
import { Outlet, useNavigate, useLocation } from "react-router";
import useIsMobile from "./useIsMobile";
const Settings = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const isMobile = useIsMobile();
    const isIndex = location.pathname === "/settings";
    const showSideBar = !isMobile || isIndex;
    const showSettingBody = !isMobile || !isIndex; 

    return (
        <div className="settings-container">
        {showSideBar && <div className="settings-sidebar">
            <div className="settings-header">Settings</div>
            <div className="settings-options">
                {/*<Link to = "/settings/account" className="a-tag-wannabe"><div className="setting-option"> <UserIcon />Account</div></Link>*/}
                <Link to = "/settings/profile" className="a-tag-wannabe"><div className="setting-option"><IdIcon />Profile</div></Link>
                <Link to = "/settings/appearance" className="a-tag-wannabe"><div className="setting-option"><PaintIcon />Appearance</div></Link>
                <div className="back-button"><div onClick={() => navigate("/")}><BackIcon /></div></div>
            </div>
        </div>}
        {showSettingBody && <Outlet />}
        </div>
    )
}
export default Settings;