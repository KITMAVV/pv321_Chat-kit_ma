import socket from "./MySocketIo"


export default function ChatMessageForm () {

    const doEmitMessage = (ev) => {
        ev.preventDefault()

        const msg = ev.target.message.value
        console.log(msg)

        socket.emit('new_message', msg)
        ev.target.message.value = ''

    }

    return(
        <>
        <form onSubmit={doEmitMessage}>
            <input type="text" name="message" />
            <input type="submit" value="send"/>
        </form>
        </>
    )
}