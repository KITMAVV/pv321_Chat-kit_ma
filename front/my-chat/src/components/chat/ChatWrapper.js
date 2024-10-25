import socket from "./MySocketIo";
import { toast } from "react-toastify";
import ChatMessageForm from "./ChatMessageForm";
import { useEffect, useState } from "react";
import ChatMessagesList from "./ChatMessagesList";
import ServerPing from "./ServerPing";
import ChatNameForm from "./ChatNameForm";
import './ChatWrapper.css';

export default function ChatWrapper() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('new_message', (data) => {
            console.log(data);
            setMessages(prevMessages => [...prevMessages, data]);
        });

        socket.on('new_name_user', (data) => {
            const msgToList = {
                name: 'System',
                msg: `User ${data.oldNameUser} now knows as ${data.newNameUser}`,
                createdAt: data.createdAt
            };
            setMessages(prevMessages => [...prevMessages, msgToList]);
        });

        socket.on('new_user_connection', (data) => {
            const msg = {
                name: 'System',
                createdAt: data.connectedAt,
                msg: `Welcome new user ${data.name}`
            };
            setMessages(prevMessages => [...prevMessages, msg]);
        });
    }, []);

    return (
        <>
            <div className="wrapper">
                <header className="header">
                    <h1>CHAT(V.kit_ma)</h1>
                    <ServerPing />
                </header>
                <div className="chat-container">
                    <ChatMessagesList messages={messages} />
                </div>
                <div className="input-container">
                    <ChatNameForm />
                    <ChatMessageForm />
                </div>
            </div>
        </>
    );
}
