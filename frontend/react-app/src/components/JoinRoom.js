import React, { useState } from 'react';

const JoinRoom = ({ onJoinRoom }) => {
  const [roomID, setRoomID] = useState('');

  const handleJoinRoom = () => {
    if (roomID.trim() !== '') {
      onJoinRoom(roomID);
      setRoomID('');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter room ID"
        value={roomID}
        onChange={(e) => setRoomID(e.target.value)}
      />
      <button onClick={handleJoinRoom}>Join Room</button>
    </div>
  );
};

export default JoinRoom;
