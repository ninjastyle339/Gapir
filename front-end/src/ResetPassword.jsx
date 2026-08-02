import { useSearchParams, useNavigate } from "react-router"
import { useState } from "react";
import { API_URL } from "./config.js";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [searchParams] = useSearchParams();
    const [p, setP] = useState("Enter new password");
    const navigate = useNavigate();
    const handleNewPassword = async () => {
        const token = searchParams.get("token");
        const res = await fetch(`${API_URL}/users/reset-password`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({newPassword: password, token}),
        });
        if(res.ok){
            navigate("/login");
        }
        else {
            setPassword("");
            setP("Couldn't reset")
        }
    }                                                                                    

    

    return <div className="reset-password-bg">
        <div className="reset-password-container">
            <div>
                <div className="reset-pass-88">New Password: </div>
                <div className="width-100"><input placeholder={p} type="password" value={password} onChange={(e) => setPassword(e.target.value)}/></div>
                <div title= "hello world" className="width-100"><button onClick={handleNewPassword}className="reset-password-button">Reset Password</button></div>
            </div>
        </div>
    </div>
}
export default ResetPassword;