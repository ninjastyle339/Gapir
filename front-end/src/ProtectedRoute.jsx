import { useAuth } from "./AuthContext";
import { Navigate } from "react-router";

function ProtectedRoute({children}){
    const {loading, user} = useAuth();
    if(loading) return <div>Loading...</div>;
    if(!user) return <Navigate to="/login" />;
    return children;
}

export default ProtectedRoute;