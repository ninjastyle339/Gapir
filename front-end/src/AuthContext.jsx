import {createContext, useContext, useState, useEffect, useRef} from "react";
import { API_URL } from "./config.js";
import { connectSocket } from "./socket.js";
const AuthContext = createContext();

export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);
    let refreshPromise = useRef(null);
    const refreshAccessToken = async () => {
        if(refreshPromise?.current) return refreshPromise.current;
        refreshPromise.current = (async () => {
            try {
            const res = await fetch(`${API_URL}/users/refresh`, {
                method: "POST",
                credentials: "include"
            });
            if(!res.ok) throw new Error("refresh failed");
            const data = await res.json();
            setAccessToken(data.accessToken);
            return data.accessToken;
        } catch {
            setAccessToken(null);
            setUser(null);
            return null;
            } finally {
                refreshPromise.current = null;
            }
        })();
        return refreshPromise.current;
    }

    useEffect(() => {
        const init = async () => {
            const token = await refreshAccessToken();
            if(token){
                const res = await fetch(`${API_URL}/users/me`, {
                    headers: {Authorization: `Bearer ${token}`},
                    credentials: "include",
                });
                if(res.ok){
                    const data = await res.json();
                    setUser(data);
                    connectSocket(token);
                }
            }
            setLoading(false);
        };
        init();
    }, []);
    const login = async (email, password) => {
        const res = await fetch(`${API_URL}/users/login`, {
            method: "POST",
            credentials: "include",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password}),
        });
        if(!res.ok) return false;
        const data = await res.json();
        setAccessToken(data.accessToken);

        const userRes = await fetch(`${API_URL}/users/me`, {
            headers: {Authorization: `Bearer ${data.accessToken}`},
            credentials: "include"
        });
        const userData = await userRes.json();
        setUser(userData);
        connectSocket(data.accessToken);
        return true;
    }


    const authFetch = async (url, options = {}) => {
        let res = await fetch(url, {
            ...options,
            credentials: "include",
            headers: {...options.headers, Authorization: `Bearer ${accessToken}`}
        });
        if(res.status === 401) {
            const newToken = await refreshAccessToken();
            if(!newToken) return res;
            res = await fetch(url, {
                ...options,
                credentials: "include",
                headers: {...options.headers, Authorization: `Bearer ${newToken}`}
            });
        }
        return res;
    }

    

    return (
        <AuthContext value = {{user, setUser, accessToken, authFetch, loading, login}}>
            {children}
        </AuthContext>
    )
}
export function useAuth(){
    return useContext(AuthContext);
}