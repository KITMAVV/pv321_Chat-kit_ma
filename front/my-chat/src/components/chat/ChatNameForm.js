import socket from "./MySocketIo";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function ChatNameForm() {
    const doEmitMessage = (ev) => {
        ev.preventDefault();
        const newName = ev.target.name.value.trim();
        if (newName === "") return;
        console.log(newName);
        socket.emit('new_name_user', newName);
        ev.target.name.value = '';
    };

    useEffect(() => {
        socket.on('new_name_user', (data) => {
            const oldName = data.oldNameUser;
            const newName = data.newNameUser;
            toast.success(`User: '${oldName}' now known as '${newName}'`);
        });

        return () => {
            socket.off('new_name_user');
        };
    }, []);

    return (
        <>
            <form className="chat-name-form" onSubmit={doEmitMessage}>
                <input type="text" name="name" className="chat-name-input" placeholder="New name" />
                <input type="submit" className="chat-name-button" value="⟳" />
            </form>
        </>
    );
}
