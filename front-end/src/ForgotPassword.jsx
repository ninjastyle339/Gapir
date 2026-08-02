import { useState } from "react";
import { API_URL } from "./config.js";
const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const handleEmail = () => {
        fetch(`${API_URL}/users/forgot-password`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email})
        }).then(res => res.json()).then(data => setEmail("Email sent")).catch(err => console.log(err));
    }
    return <div className="forgot-password-container">
        <div className="forgot-pass-c">
            <div className="forgot-pass-title"><h1>Forgot your password?</h1><p>Enter your email and we'll send a personal link</p></div>
            <div className="forgot-pass-email">
                <div><div><span className="forgot-pass-email-t">Email</span></div><input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/></div>
                <div><button onClick={handleEmail}>Send Email</button></div>
            </div>
            

        </div>
    </div>
}
export default ForgotPassword;