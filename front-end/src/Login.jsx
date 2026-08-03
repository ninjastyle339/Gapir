import {useState, useEffect} from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "./AuthContext";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const {login} = useAuth();
    async function handleLogin(){
        setIsLoading(true);
            if(!email.includes("@")){
                setError("Invalid email");
                return;
            }
            if(password.length < 6){
                setError("Password must be atleast 6 characters");
                return;
            }
            const success = await login(email, password);
            if(success) navigate("/");
            else{
                setError("Invalid credentials");
                setIsLoading(false);
            } 
            
    }
    return (
    <div className="sign-up-bg">
    <div className="sign-up-container">
        <div className="sign-up-c-title"><h1>Chat With Gapir</h1> <p>A very customizable chat app</p></div>
        <div className="sign-up-box">
            <div className="sign-up-box-2">
            <div className="email"><input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email"/></div>
            <div className="password-2"><Link to ="/forgot-password"><div>Forgot password?</div></Link><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password"/> </div>
            <div className="sign-up">
                <button className={isLoading ? "loading" : ""} disabled={isLoading} onClick={() => handleLogin()}>
                    {isLoading ? <>Logging in... <span className="sign-up-spinner"></span> </> : "Login"}
                </button>
            </div>
            <div className="login-go-to-register"><h4>Don't have an account? <Link to ="/register"><span>Register</span></Link></h4></div>
            <div className="sign-up-error-m">{error}</div>
            </div>
        </div>
    </div>
    </div>
    )
}
export default Login;