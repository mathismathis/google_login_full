import React, { useState } from 'react';
import { useLocation } from 'wouter';


function CreateRoomForm() {
    const commonWords = ['apple', 'banana', 'cherry', 'dog', 'elephant', 'fish', 'grape'];

    function getRandomIndex(max) {
        return Math.floor(Math.random() * max);
    }

    function generateSimpleRoomName() {
        const randomWordIndex = getRandomIndex(commonWords.length);
       

        const roomName = `${commonWords[randomWordIndex]}`;
        return roomName;
    }
  
    const [roomTitle, setRoomTitle] = useState('');
    const [roomSize, setRoomSize] = useState('');

    const handleCreateRoom = () => {
        const roomName= generateSimpleRoomName();

        navigate(`/chat/${roomName}`);
    };

    const [, navigate] = useLocation();

    return (
        <div>
            <h2>Create a New Chat Room</h2>
          
            <input
                type="text"
                placeholder="Room Title"
                value={roomTitle}
                onChange={(e) => setRoomTitle(e.target.value)}
            />
            <input
                type="number"
                placeholder="Room Size"
                value={roomSize}
                onChange={(e) => setRoomSize(e.target.value)}
            />
            <button onClick={handleCreateRoom}>Create Room</button>
            
        </div>
    );
}

export default CreateRoomForm;
