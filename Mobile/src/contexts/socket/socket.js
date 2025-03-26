import io from "socket.io-client";
import { getRealTimeServerURL } from "../../config/config";
import { createContext } from 'react';
import React, { useEffect, useRef } from 'react';

export const SocketContext = createContext();

const Socket = props => {
    
    const server = io(getRealTimeServerURL(), {
        path: '/rt'
    });


    return(
        <SocketContext.Provider value={server}>
            {props.children}
        </SocketContext.Provider>
    )
    
}

export default Socket;