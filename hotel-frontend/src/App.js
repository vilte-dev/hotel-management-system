import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({
    number: '',
    room_type: 'SNG',
    price_per_night: '',
    is_available: true
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  // 1. Obtener habitaciones (GET)
  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/rooms/');
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // 2. Crear habitación (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/rooms/', newRoom);
      setNewRoom({ number: '', room_type: 'SNG', price_per_night: '', is_available: true });
      fetchRooms(); 
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  // 3. Borrar habitación (DELETE)
  const deleteRoom = async (id) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/rooms/${id}/`);
        fetchRooms();
      } catch (error) {
        console.error("Error deleting room:", error);
      }
    }
  };

  // 4. Cambiar disponibilidad (PUT)
  const toggleAvailability = async (room) => {
    try {
      const updatedRoom = { ...room, is_available: !room.is_available };
      await axios.put(`http://127.0.0.1:8000/api/rooms/${room.id}/`, updatedRoom);
      fetchRooms();
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  return (
    <div className="App">
      <h1>Hotel Management System</h1>
      
      {/* Formulario de Registro */}
      <form className="room-form" onSubmit={handleSubmit}>
        <input 
          placeholder="Room Number" 
          value={newRoom.number}
          onChange={(e) => setNewRoom({...newRoom, number: e.target.value})}
          required 
        />
        <select 
          value={newRoom.room_type}
          onChange={(e) => setNewRoom({...newRoom, room_type: e.target.value})}
        >
          <option value="SNG">Single</option>
          <option value="DBL">Double</option>
          <option value="SUT">Suite</option>
        </select>
        <input 
          placeholder="Price" 
          type="number"
          value={newRoom.price_per_night}
          onChange={(e) => setNewRoom({...newRoom, price_per_night: e.target.value})}
          required 
        />
        <button type="submit">Add Room</button>
      </form>

      {/* Cuadrícula de Habitaciones con el diseño que te gusta */}
      <div className="room-grid">
        {rooms.map(room => (
          <div key={room.id} className="room-card">
            {/* Botón X discreto para borrar */}
            <button className="btn-delete-small" onClick={() => deleteRoom(room.id)}>×</button>
            
            <h3>Room {room.number}</h3>
            <p>Type: {room.room_type}</p>
            <p>Price: ${room.price_per_night}</p>
            
            {/* Botón dinámico Available/Occupied */}
            <button 
              onClick={() => toggleAvailability(room)}
              className={`btn-status ${room.is_available ? 'btn-available' : 'btn-occupied'}`}
            >
              {room.is_available ? 'Available' : 'Occupied'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;