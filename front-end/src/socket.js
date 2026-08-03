import {io} from "socket.io-client";
import { API_URL } from "./config";
let socket = null;

export const connectSocket = (token) => {
    if(socket) return socket;
    socket = io(`${API_URL}`, {auth: {token}});
    return socket;
}
export const getSocket = () => socket;

export const disconnectSocket = () => {
    socket?.disconnect();
    socket = null;
}