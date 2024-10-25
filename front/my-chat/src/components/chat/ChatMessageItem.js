import socket from "./MySocketIo";

export default function ChatMessageItem({ message }) {
    const isOwnMessage = message.userId === socket.id;
    const isSystemMessage = message.name === 'System';

    return (
        <li className={`chat-bubble ${isSystemMessage ? "system-message" : (isOwnMessage ? "own-message" : "other-message")}`}>
            <div className="chat-content">
                <strong>{isSystemMessage ? "System" : (isOwnMessage ? "You" : message.name)} :</strong>
                <p>{message.msg}</p>
                <small>{(new Date(message.createdAt)).toLocaleString()}</small>
            </div>
        </li>
    );
}
