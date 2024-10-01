import {useState} from "react";
import ChatMessageForm from "./ChatMessageForm";

export default function ChatMessageItem (props) {


    return(
        <>
            <li>
                <small>{(new Date(props.message.createdAt)).toLocaleString()} </small>
                <strong>{props.message.name} :</strong>
                {props.message.msg}
            </li>
        </>
    )
}