// ChatRoomPage.js
import React, { useState, useEffect, useRef } from 'react';
// import { useLocation } from 'wouter';




function ChatRoomPage() {
    const pathSegments = window.location.pathname.split('/');
    const roomName = pathSegments[pathSegments.length - 1];

    console.log(roomName);

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomName}/`);

        socketRef.current.onmessage = (event) => {
            const messageData = JSON.parse(event.data);
            setMessages([...messages, messageData]);
        };

        return () => {
            socketRef.current.close();
        };
    }, [roomName, messages]);

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            const message = {
                room: roomName,
                message: newMessage,
            };
            socketRef.current.send(JSON.stringify(message));
            setNewMessage('');
        }
    };

    return (
        <div className="chat-room">
          
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div key={index} className="message">
                        <div className="message-user">{message.user}:</div>
                        <div className="message-content">{message.message}</div>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}

export default ChatRoomPage;
