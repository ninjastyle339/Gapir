import { IdIcon, ShareIcon, TerminalIcon, EyeIcon, ThreeBars } from "./Icons";
import { useNavigate } from "react-router";
import { useAuth } from "./AuthContext";
import useIsMobile from "./useIsMobile";
import { useState } from "react";
import { API_URL } from "./config";
const ProfileSettings = () => {
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    const {user, setUser, authFetch} = useAuth();
    const [file, setFile] = useState(null);
    const profilePic = user.avatar ? `${API_URL}${user.avatar}` : "/default-avatar.png";
    const [preview, setPreview] = useState(profilePic);
    const [saveButton, setSaveButton] = useState("Save Changes");
    const handleFilechange = (e) => {
        const selected = e.target.files[0];
        setFile(selected);
        setPreview(URL.createObjectURL(selected));
    }
    const saveChanges = async () => {
        if(!file) return;
        const formData = new FormData();
        formData.append("avatar", file);
        const res = await authFetch(`${API_URL}/users/me/avatar`, {
            method: "POST",
            body: formData
        });
        if(!res.ok){
            console.log(res.status);
            return;
        }
        const data = await res.json();
        setUser(prev => ({...prev, avatar: data.updated}));
        setSaveButton("Changes Applied");
        setFile(null);
        setTimeout(() => setSaveButton("Save Changes"), 1000);
    }
    
    return (
        <div className="profile-settings">
            <div className="profile-settings-header-bg"></div>
            <div className="profile-settings-main">
                <div className="profile-settings-main-1">
                    {isMobile && <div onClick={() => navigate("/settings")}className="chat-back-button"><ThreeBars /></div>}
                    <div className="header">
                        <div>
                        <div className="profile-pic">
                            <img src = {preview} alt="" height="80" width="80"/>
                            <label className="file-upload-2" htmlFor="file-upload2"></label>
                            <input onChange={handleFilechange} type="file" id="file-upload2" accept="image/*"/>
                        </div>
                        <div className="name-bio">
                            <h1>{user.username}</h1>
                            <p>Is currently developing this</p>
                        </div>
                        </div>
                        <div className="save-changes">
                            <div className="flex save-changes-1">
                            <div><button className="button-1">Cancel</button></div>
                            <div><button onClick={saveChanges} className="button-2">{saveButton}</button></div>
                            </div>
                        </div>
                    </div>
                    <div className="the-rest">
                        <div>
                            <div className="bio">
                                <div><IdIcon /><div>Basic Information</div></div>
                                <div>
                                    <div>
                                        <div>Display Name</div>
                                        <div><input type="text" placeholder="username"/></div>
                                    </div>
                                    <div>
                                        <div>Job Title</div>
                                        <div><input type="text" placeholder="whatever"/></div>
                                    </div>
                                </div>
                                <div>
                                    <div>Biography</div>
                                    <div className="flex-1"><textarea name="" id=""></textarea></div>
                                </div>
                            </div>
                            {/*<div className="social-presence">
                                <div><ShareIcon /><div>Social Presence</div></div>
                                <div>
                                    <div className="social-link"><TerminalIcon /> github.com/esandikv</div>
                                </div>
                            </div>*/}
                        </div>
                        {/*<div>
                            <div className="public-presence">
                                <div><EyeIcon />Public Presence</div>
                                <div><h3>Show Profile</h3><p>Visible to all workplace members</p></div>
                                <div><h3>Available for hire</h3><p>Show badges on your profile</p></div>
                                <div><h3>Show online status</h3><p>Realtime presence indicator</p></div>
                            </div>
                            <div className="showcase"></div>
                            <div className="workspace"></div>
                        </div>*/}
                            
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileSettings;