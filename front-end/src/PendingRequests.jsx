import { useState, useEffect } from "react";
const Check = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="20" height="20">
  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>
)
const X = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="20" height="20">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
)



    export const getTimeAgo = (timestamp) => {
        const now = new Date();
        const past = new Date(timestamp);
        const diffInSeconds = Math.floor((now - past)/1000);
        //units in seconds
        const units = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60,
        };
        if(diffInSeconds < 60) return 'just now';

        for(const [unit, seconds] of Object.entries(units)){
            const time = Math.floor(diffInSeconds / seconds);
            if(time >= 1){
                return `${time} ${unit}${time > 1 ? 's' : ''} ago`
            }
        }
    }
    
import { useAuth } from "./AuthContext";
import { API_URL } from "./config.js";
const PendingRequests = () => {
    const [requests, Setrequests] = useState([]);
    const [text, setText] = useState("");
    const {authFetch} = useAuth();
    
    useEffect(() => {
        authFetch(`${API_URL}/friends/requests`).then(res => res.json()).then(data => Setrequests(data)).catch(err => console.log(err));
        }, []);
        const handleAccept = async (id, idx) => {
            const res = await authFetch(`${API_URL}/friends/request/${id}/accept`, {
                method: "PATCH"
            });
            if(res.ok){
                setText("Friend request accepted");
                Setrequests(prev => prev.filter((_, i) => i !== idx));
                return;
            }
            else {
                setText("Something went wrong");
            }
        }
        const handleReject = async (id, idx) => {
            const res = await authFetch(`${API_URL}/friends/request/${id}/reject`, {method: "PATCH"});
            if(res.ok){
                setText("Friend request rejected");
                Setrequests(prev => prev.filter((_, i) => idx !== i));
                return;
            }
            else setText("Something went wrong");
        }
    return (
        <div className="pending-req-container">
            <div className="pending-req-title">
                <div><h1>Pending Requests</h1></div>
                <div><p>Manage your connections and incoming collaborator invites</p></div>
            </div>
            <div className="pending-req-income">
                <div>Incoming <span>{requests.length}</span></div>
                <div>Outgoing</div>
            </div>

            <div className="friend-order">
                {requests.map((req, idx) => (
                    <div key = {req.id} className="friend-request">
                        <div>{req.sender.username} <p>{getTimeAgo(req.createdAt)}</p></div> 
                        <div className="friend-req-order">
                            <button className="friend-accept-button" onClick={() => handleAccept(req.id, idx)}><div>Accept</div> <div><Check /></div></button>
                            <div onClick={() => handleReject(req.id, idx)} className="X-marks-the-spot"><X /></div>
                        </div>
                    </div>
                    
                ))}
            </div>
        </div>
    )
}
export default PendingRequests;