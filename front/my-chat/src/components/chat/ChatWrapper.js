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

        socket.on('new_user_connection', (data) => {
            const msg = {
                name: data.name,
                createdAt: data.connectedAt,
                msg: " Welcome New User "
            }
            setMessages(prevMessages => [...prevMessages, msg]);

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