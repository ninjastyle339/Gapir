import { NewspaperIcon } from "./Icons";
import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { API_URL } from "./config.js";
import { ThreeBars } from "./Icons";
import { useNavigate } from "react-router";
import useIsMobile from "./useIsMobile.jsx";
const AppearanceSettings = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const {user, setUser, authFetch} = useAuth();
    const [opacity, setOpacity] = useState(user?.theme?.chatBgOpacity ?? 0.3);
    const [font, setFont] = useState("");
    const [fontplaceholder, setFontplaceholder] = useState("Enter google font");
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        setFile(selected);
        setPreview(URL.createObjectURL(selected));
    }
    const handleUpload = async () => {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("chat-bg", file);
        const res = await authFetch(`${API_URL}/users/me/chat-bg`, {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        setUser(prev => ({...prev, theme: data.theme}));
        setPreview(null);
    }
    const handleUploadOpacity = async () => {
        const res = await authFetch(`${API_URL}/users/me/chat-bg-opacity`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({opacity})
        });
        const data = await res.json();
        setUser(prev => ({...prev, theme: data.theme}));
        
    }
    useEffect(() => {
        const timeout = setTimeout(() => {
            handleUploadOpacity();
        }, 500);
        return () => clearTimeout(timeout);
    }, [opacity]);
    useEffect(() => {
        if(user?.theme?.chatBgOpacity !== undefined) {
            setOpacity(user.theme.chatBgOpacity);
        }
    }, [user?.theme?.chatBgOpacity]);

    const applyGoogleFont = async (fontName) => {
        if(fontName === "" || !fontName) return;
        const formatted = fontName.trim().replace(/\s+/g, "+");
        const link = document.createElement("link");
        link.id = "user-google-font";
        link.rel = "stylesheet";
        link.href = `https://fonts.googleapis.com/css2?family=${formatted}&display=swap`;

        document.getElementById("user-google-font")?.remove();
        document.head.appendChild(link);
        document.documentElement.style.setProperty("--user-font", fontName);
        const res = await authFetch(`${API_URL}/users/me/chat-font`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({chatFont: fontName})
        });
        const data = await res.json();
        setFont("");
        if(res.ok) {
            setFontplaceholder("Font saved!");
            setUser(prev => ({...prev, theme: data.theme}));
        } else setFontplaceholder("Couldn't upload");
        
        
    }
    useEffect(() => {
        const timeout = setTimeout(() => setFontplaceholder("Enter google font"), 1500);
        return () => clearTimeout(timeout);
    }, [fontplaceholder]);

    return (
        <div className="appearance-settings-container">
            <div className="header"><div>{isMobile && <div className="chat-back-button" onClick={() => navigate("/settings")}><ThreeBars /></div>}<h1>Appearance</h1></div><div><p>Customize the interface visual properties</p></div></div>
            <div className="background-customization">
                <h3>Background Customization</h3>
                <div>
                    <div>
                        <div><h4>Background Image</h4></div>
                        <div className="width-100">
                            <input onChange={handleFileChange} type="file" accept = "image/*" id="file-upload" className="file-upload-input"/>
                            {!preview && <label for ="file-upload" className="file-upload-label">
                                <span className="file-upload-icon"><NewspaperIcon /></span>
                                Upload an image
                            </label>}
                            <img src={preview} alt="" />

                            {preview && <div className="bg-chat-upload-btn">
                                <button onClick={handleUpload}>Upload</button><button onClick={() => setPreview(null)}>Cancel</button>
                            </div>}
                        </div>
                    </div>
                    <div className="appearance-opacity-setting-box">
                        <div><h4>Surface Opacity</h4><p>Adjust transparency of UI layers</p>
                        </div>
                        <div>
                            <div>0%</div>
                            <div><input type="range" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))}step="0.001" min="0" max="1" /></div>
                            <div>100%</div>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="font-settings">
                <div className=""><h3>Font</h3></div>
                <div className="font-settings-container">
                    <div>
                        <div><h4>Font Family</h4></div>
                        <div><input value={font} placeholder={fontplaceholder} onChange={(e) => setFont(e.target.value)} className="dark-input"type="text" /> <button onClick={() => applyGoogleFont(font)}className="save-button">Save</button></div>
                    </div>
                    <div>
                        <div><h4>Font Scaling</h4></div>
                        <div><input className="clean-input" type="range" step="0.01" /></div>
                    </div>
                </div>
            </div>
            <div className=""></div>
        </div>
    )
}

export default AppearanceSettings;