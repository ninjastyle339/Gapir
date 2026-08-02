import {useState, useEffect} from "react";
import { useNavigate } from "react-router";
const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    async function handleSignIn(){
        try {
            if(!email.includes("@")){
                setError("Invalid email");
                return;
            }
            if(password.length < 6){
                setError("Password must be atleast 6 characters");
                return;
            }
            const res = await fetch("http://localhost:3000/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, username, password})
            });
            if(res.status == 400) {
                setError("Email taken");
                return;
            }
            if(res.status == 500){
                setError("Something went wrong");
                return;
            }
            navigate("/login");
        } catch(err){
            setError("Could not connect to server");
        }
    }
    return (
    <div className="sign-up-bg">
    <div className="sign-up-container">
        <div className="sign-up-c-title"><h1>Chat With Gapir</h1> <p>A very customizable chat app</p></div>
        <div className="sign-up-box">
            <div className="sign-up-box-2">
            <div className="email"><input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email"/></div>
            <div className="username"><input type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} /></div>
            <div className="password"><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password"/></div>
            <div className="sign-up">
                <button onClick={() => handleSignIn()}>Sign Up</button>
            </div>
            <div className="sign-up-error-m">{error}</div>
            </div>
        </div>
    </div>
    </div>
    )
}
export default SignUp;