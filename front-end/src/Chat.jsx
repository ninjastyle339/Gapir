import {useState, useEffect, useRef} from "react";
import {getSocket} from "./socket.js";
import { Link } from "react-router";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "./AuthContext";
import { API_URL } from "./config.js";
import { ThreeBars } from "./Icons.jsx";
import useIsMobile from "./useIsMobile.jsx";
const Chat = () => {
    const {roomId} = useParams();
    const chatVisible = (roomId === null ? false : true );
    const messagesEndRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [dmname, Setdmname] = useState("");
    const {user, accessToken, authFetch} = useAuth();
    const socket = getSocket();
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    //load all previous messages
    useEffect(() => {
        if(!roomId) return;
        authFetch(`${API_URL}/rooms/${roomId}/messages`).then(res => res.json()).then(data => setMessages(data)).catch(err => console.log(err));
        authFetch(`${API_URL}/rooms/${roomId}/members`).then(res => res.json()).then(data => Setdmname(data));
        
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
        }, 50);
    }, [roomId]);
    //join socket room + listen for live messages
    useEffect(() => {
        if(!roomId) return;
        socket?.emit("joinRoom", roomId);
        const handleNewMessage = (msg) => {
            setMessages((prev) => [...prev, msg]);
        }
        socket.on("newMessage", handleNewMessage);
        return () => {
            socket.emit("leaveRoom", roomId);
            socket.off("newMessage", handleNewMessage);
        }
    }, [roomId]);
    useEffect(() => {
        if(user?.theme?.chatFont === undefined) return;
        const formatted = user?.theme?.chatFont.trim().replace(/\s+/g, "+");
        const link = document.createElement("link");
        link.id = "user-google-font";
        link.rel = "stylesheet";
        link.href = `https://fonts.googleapis.com/css2?family=${formatted}&display=swap`;
        document.getElementById("user-google-font")?.remove();
        document.head.appendChild(link);
        document.documentElement.style.setProperty("--user-font", user?.theme?.chatFont);
    }, [user?.theme?.chatFont])
    const handleSend = () => {
        if(!roomId) return;
        socket.emit("sendMessage", {roomId, content: text});
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
        }, 50);
        setText("");
    }

    const chatBg = user?.theme?.chatBg;
    const chatBgOpacity = user?.theme?.chatBgOpacity;
    const bgImage = `url(http://localhost:3000${chatBg})`;
    
    return (
        <div className="chat-main-section">
            <div className="chat-main-header">
                {/*<div><Link to="/add-friend"><button>Add Friends</button></Link></div>
                <div><Link to ="/pending-requests"><button>Pending Requests</button></Link></div> */}
                {isMobile && <div onClick={() => navigate("/")} className="chat-back-button"><ThreeBars /> </div>}
            </div>
            <div className="chat-below-header-area">
                <div className="chat-bg-layer" style={{
                    position: "absolute",
                    inset: "1.25rem",
                    backgroundImage: bgImage,
                    backgroundPosition: "center",
                    zIndex: 0,
                    opacity: chatBgOpacity ? chatBgOpacity : 0.3,
                }}></div>
                <div className="chat-msg-container" style={{zIndex: 1}}>
                <ul className="chat-fix-pls">
                    {messages.map(m => (
                        <div className="chat-element">
                       <img src={`${m.author.avatar ? `${API_URL}${m.author.avatar}` : "/default-avatar.png"}`} height="30" width="30" alt="" /> <p key = {m.id}><b>{m.author.username}: </b>{m.content}</p>
                       </div>
                    ))}
                    <div ref={messagesEndRef}></div>
                </ul>
                </div>
                <div className="chat-input" style={{zIndex: 1}}>
                <input type="text" placeholder={`Chat With @${dmname.length === 2 ? (dmname[0].user.username === user?.username ? dmname[1].user.username : dmname[0].user.username) : dmname.length }`} value={text} onChange={e => setText(e.target.value)} />
                <button onClick={handleSend}>Send</button>
                </div>
                
            </div>
            {!chatVisible && <div>
                <p></p>
                </div>}
        </div>
    )
}
export default Chat;