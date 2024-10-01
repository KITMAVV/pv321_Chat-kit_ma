import socket from "./MySocketIo"
import {toast} from "react-toastify";
import ChatMessageForm from "./ChatMessageForm";
import {useEffect, useState} from "react";
import ChatMessagesList from "./ChatMessagesList";

export default function ChatWrapper () {


    const [messages, setMessages ] = useState([]);

    useEffect(() => {
        socket.on('new_message', (data) => {
            console.log(data)
            setMessages(prevMessages => [...prevMessages, data]);
        })
    },[])


    return(
        <>
            <h1> Chat </h1>
            <ChatMessagesList messages={messages} />
            <hr />
            <ChatMessageForm />
        </>
    )
}