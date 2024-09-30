import socket from "./MySocketIo"
import {toast} from "react-toastify";
import ChatMessageForm from "./ChatMessageForm";

export default function ChatWrapper () {


    // const onConnect = () => {
    //   toast.info('connect')
    // }
    //
    // const  onDisconnect = () => {
    //     toast.error('disconnect')
    // }
    //
    // socket.on('connect', onConnect);
    // socket.on('disconnect', onDisconnect);


    return(
        <>
            <h1> Chat </h1>
            <ChatMessageForm />
        </>
    )
}