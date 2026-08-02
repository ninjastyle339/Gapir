import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { API_URL } from "./config.js";

const Verify = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState("Verifying...");

    useEffect(() => {
        const token = searchParams.get("token");
        if(!token) return setStatus("No token found");

        fetch(`${API_URL}/users/verify?token=${token}`)
        .then(res => res.json())
        .then(data => setStatus(data.message || data.error))
        .catch(err => console.log(err));
    }, []);

    return <div><p>{status}</p></div>
}
export default Verify;