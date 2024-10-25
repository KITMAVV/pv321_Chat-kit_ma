import socket from "./MySocketIo";

export default function ChatMessageForm() {
    const doEmitMessage = (ev) => {
        ev.preventDefault();
        const msg = ev.target.message.value.trim();
        if (msg === "") return;
        console.log(msg);
        socket.emit('new_message', msg);
        ev.target.message.value = '';
    };

    return (
        <>
            <form className="chat-message-form" onSubmit={doEmitMessage}>
                <input type="text" name="message" className="chat-message-input" placeholder="Message" />
                <input type="submit" className="chat-message-button" value="➤" />
            </form>
        </>
    );
}
