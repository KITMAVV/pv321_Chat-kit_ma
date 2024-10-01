import { io } from 'socket.io-client';
import {toast} from "react-toastify";

const URL = 'http://localhost:3030';

const socket = io(URL);

const onConnect = () => {
    toast.info('connect')
}

const  onDisconnect = () => {
    toast.error('disconnect')
}

socket.on('connect', onConnect);
socket.on('disconnect', onDisconnect);


export default socket;