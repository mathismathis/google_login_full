import React, { useEffect, useState } from 'react';

const ListRooms = ({ socket }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Listen for the list_rooms event from the WebSocket
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.action === 'list_rooms') {
        setRooms(data.rooms);
      }
    };

    // Fetch the list of rooms when the component mounts
    socket.send(JSON.stringify({ action: 'fetch_rooms' }));

    // Cleanup when the component unmounts
    return () => {
      socket.onmessage = null;
    };
  }, [socket]);

  return (
    <div>
      <h2>Available Rooms</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            <strong>{room.name}</strong> - {room.room_title}, Size: {room.room_size}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListRooms;
