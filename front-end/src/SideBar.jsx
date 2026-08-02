const MessageIcon = ({size = 20}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" width={size} height={size}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
</svg>
)
const PencilSquare = ({size = 20}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" width={size} height={size}>
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>
)
const SearchIcon = ({size=20}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" width={size} height={size}>
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
)
const TreeIcon = ({size=20}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tree-palm-icon lucide-tree-palm"><path d="M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4"/><path d="M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3"/><path d="M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35"/><path d="M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14"/></svg>
)
const GearIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="30" height="30">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
)

import {useState, useEffect} from "react";
import { Link } from "react-router";
import { getSocket } from "./socket.js";
import { API_URL } from "./config.js"
import { useAuth } from "./AuthContext"
const SideBar = ({onSelectRoom}) => {
    const [rooms, setRooms] = useState([]);
    const [nofriends, setNofriends] = useState(false);
    const {authFetch, user} = useAuth();
    const socket = getSocket();
    const avatar = user.avatar ? `${API_URL}${user.avatar}` : "/default-avatar.png";
    const defaultProfilePic = <img className="sidebar-profile-pic" src = {avatar} height="80" width="80" />;
    const sdefaultProfilePic = <img className="sidebar-profile-pic" src = "/default-avatar.png" height="30" width="30" />;
    useEffect(() => {
        authFetch(`${API_URL}/rooms`).then(res => res.json()).then(data => setRooms(data)).catch(err => console.log(err));
    }, []);
    //update friend side bar real time 
    const username = user?.username;
    useEffect(() => {
        const handleReqAcc = (room) => {
            setRooms(prev => [...prev, room]);
        }
        socket.on("friendRequestAccepted", handleReqAcc);
        return () => {
            socket.off("friendRequestAccepted", handleReqAcc);
        }
    }, []);
    function groupImg(avatar){
        return <img className="groupImg" src={`${API_URL}${avatar}`} height = "30" width="30"/>
    }
    return (
        <div className="sidebar-container">
            <div className="sidebar-format">
                <div className="sidebar-header1">
                    <div className="sidebar-header">
                        <div className="left">
                            <div><MessageIcon size={32}/></div>
                            <div>Messages</div>
                        </div>
                        <div className="right"> <PencilSquare size={32} /></div>
                    </div>
                    <div className="width-100"><Link to="/add-friend"><button>Add Friends</button></Link></div>
                    <div className="width-100"><Link to ="/pending-requests"><button>Pending Requests</button></Link></div> 
                </div>
                <div className="sidebar-messages">
                    <div className="sidebar-msg-hdr">
                        <div>Direct Messages</div>
                        <div><SearchIcon size={25}/></div>
                    </div>
                    <div className="friend-list">
                            
                                {rooms.map(room => (
                                    <Link key = {room.id} className="a-tag-wannabe" to={`/rooms/${room.id}`}>
                                    <li className="friends-dms-side" onClick={() => onSelectRoom(room.id)} key={room.id}>
                                        {room.isDM ? (room.members[0].user.username === username ? (room.members[1].user.avatar ? groupImg(room.members[1].user.avatar) : sdefaultProfilePic) : (room.members[0].user.avatar ? room.members[0].user.avatar : sdefaultProfilePic) ) : room.name}
                                        {room.isDM ? (room.members[0].user.username === username ? room.members[1].user.username : room.members[0].user.username) : room.name}
                                        </li>
                                    
                                    </Link>
                                    
                                ))}
                            
                            {nofriends && <p>No Friends....</p>}
                        </div>
                </div>
                <div className="sidebar-user">
                    <div>{defaultProfilePic}</div>
                    <div className="fix-p-id-1">
                        <div className="sidebar-username"><h1>{username}</h1></div>
                        <div className="sidebar-username-session"><p>Active Session</p> <Link to="/settings/profile"><div className="settings-icon"><GearIcon /></div></Link></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SideBar;