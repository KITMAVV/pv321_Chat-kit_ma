import socket from "./MySocketIo";
import {useEffect, useState} from "react";


export default function ServerPing () {

    const [serverTime, setServerTime ] = useState(0);



    useEffect(() => {

        setInterval(() => {
            let d = Date.now()
            console.log('---> to server: ' + d)
            socket.emit('ping', d);
        }, 5000);

        socket.on('ping', (data) =>{
            console.log('from server -->: ' + data)
            setServerTime(data)
        })
    }, []);


    return(<>{serverTime}</>)
}