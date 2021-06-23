import React, { useState } from "react";
import Jitsi from "react-jitsi";

export default function App(props) {
    const roomName = "klu123";
    const userFullName = "KLUIAN";
    return (
        <>
            <Jitsi
                password={props.meeting_password}
                frameStyle={{ display: 'block', width: '100%', height: '100%' }}
                containerStyle={{ width: "1200px", height: "800px" }}
                domain="meet.jit.si"
                roomName={props.roomName||roomName}
                displayName={userFullName}
            />
        </>
    );
}
