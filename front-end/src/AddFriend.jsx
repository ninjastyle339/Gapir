import { useState } from "react";
const UserPlus = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="40" height="40">
  <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
</svg>

)
import { useAuth } from "./AuthContext";
import { API_URL } from "./config";
const AddFriend = () => {
    const [text, setText] = useState("");
    const [status, setStatus] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const {authFetch} = useAuth();
    const handleSend = async () => {
        setIsLoading(true);
        const lookupRes = await authFetch(`${API_URL}/users/lookup?email=${encodeURIComponent(text)}`);
        if(!lookupRes.ok){
            setStatus("No user found");
            setIsLoading(false);
            return;
        }
        const user = await lookupRes.json();
        const requestRes = await authFetch(`${API_URL}/friends/request`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({receiverId: user.id})
        });
        if(requestRes.ok){
            setStatus("Friend request sent");
            setText("");
            setIsLoading(false);
            return;
        } else setStatus("Couldn't send friend request");
        setIsLoading(false);
    }


    return (
        <div className="add-friend-page">
            <div className="add-friend-header"><UserPlus /> <h1>Add Friends</h1></div>
            <div className="add-friend-title">
                <div><h1>Connect With <span>Peers</span></h1></div>
                <div><p>Initiate a peer-to-peer connection shesh</p></div>
            </div>
            <div className="add-friend-stuff">
                <div className="add-friend-stuff-2">
                <span>ID: </span>
                <input value={text} onChange={e => setText(e.target.value)} type="text" placeholder={status === "" ? "Enter friends email" : status}/>
                <div className="add-friend-button"><button disabled={isLoading} onClick={handleSend}>{isLoading ? "Sending..." : "Send"}</button></div>
                </div>
            </div>
        </div>
    )
}
export default AddFriend;