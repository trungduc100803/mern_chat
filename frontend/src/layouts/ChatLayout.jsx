import './ChatLayout.scss'
import SideBar from "../components/SideBar/SideBar";
import socket from '../config/socketIO'

import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';



function ChatLayout({ children }) {


    const token = useRef(localStorage.getItem('token'))
    const { currentAuth } = useSelector(state => state.auth)
    useEffect(() => {
        const IDAuth = currentAuth.auth._id
        socket.connect()
        socket.emit('user-online', IDAuth)
    }, [])

    if (token.current === null) {
        window.location.href = 'http://localhost:3000/login'
    } else {
        return <div className="ChatLayout">
            <div className="chat_sidebar_layout">
                <SideBar />
            </div>
            <div className="chat_children_layout">
                {children}
            </div>
        </div>
    }

}

export default ChatLayout;