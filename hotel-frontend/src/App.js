import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // State to store our rooms from Django
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Function to fetch data from our API
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/rooms/');
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hotel Management System</h1>
        <div className="room-grid">
          {rooms.map(room => (
            <div key={room.id} className="room-card">
              <h3>Room {room.number}</h3>
              <p>Type: {room.room_type}</p>
              <p>Price: ${room.price_per_night}</p>
              <span className={room.is_available ? 'status-ok' : 'status-busy'}>
                {room.is_available ? 'Available' : 'Occupied'}
              </span>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;