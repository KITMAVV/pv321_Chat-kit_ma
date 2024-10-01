import React, {useState} from "react";
import ChatMessageForm from "./ChatMessageForm";
import ChatMessageItem from "./ChatMessageItem";

export default function ChatMessagesList (props) {


    return(
        <>
            <ul>
                {props.messages.map((message, index) => (
                    <ChatMessageItem message={message} key={index}/>
                ))}
            </ul>
        </>
    )
}