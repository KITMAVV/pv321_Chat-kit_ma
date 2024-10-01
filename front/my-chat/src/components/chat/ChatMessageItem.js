import {useState} from "react";
import ChatMessageForm from "./ChatMessageForm";

export default function ChatMessageItem (props) {


    return(
        <>
            <li>{props.message}</li>
        </>
    )
}