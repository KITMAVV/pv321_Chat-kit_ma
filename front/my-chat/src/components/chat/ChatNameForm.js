import socket from "./MySocketIo"


export default function ChatNameForm () {

    const doEmitMessage = (ev) => {
        ev.preventDefault()

        const newName = ev.target.name.value
        console.log(newName)

        socket.emit('new_name_user', newName)
        ev.target.name.value = ''

    }

    return(
        <>
        <form onSubmit={doEmitMessage}>
            <input type="text" name="name" />
            <input type="submit" value="send"/>
        </form>
        </>
    )
}