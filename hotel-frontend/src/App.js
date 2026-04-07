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

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/rooms/');
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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

  const toggleAvailability = async (room) => {
    try {
      const updatedRoom = { ...room, is_available: !room.is_available };
      await axios.put(`http://127.0.0.1:8000/api/rooms/${room.id}/`, updatedRoom);
      fetchRooms();
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  const deleteRoom = async (id) => {
    if (window.confirm("¿Estás seguro de quitar esta habitación, che?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/rooms/${id}/`);
        fetchRooms();
      } catch (error) {
        console.error("Error deleting room:", error);
      }
    }
  };

  return (
    <div className="App">
      {/* SECCIÓN HERO: El alma de Tarija */}
      <header className="hero-alzau">
        <div className="hero-content">
          <h1 className="title-alzau">Hotel El Alzau</h1>
          <p className="subtitle-alzau">Donde el sol calienta y el vino alegra el alma.</p>
          
          <div className="search-alzau">
            <input type="text" placeholder="¿Cuándo venís a Tarija?" />
            <select 
              value={newRoom.room_type}
              onChange={(e) => setNewRoom({...newRoom, room_type: e.target.value})}
            >
              <option value="SNG">Simple (Single)</option>
              <option value="DBL">Doble (Double)</option>
              <option value="SUT">Suite Alzau</option>
            </select>
            <button className="btn-alzau-main">Buscar Refugio</button>
          </div>
        </div>
      </header>

      <main className="container-alzau">
        {/* PANEL DE ADMINISTRACIÓN (Formulario arriba, pero discreto) */}
        <section className="admin-section">
          <details>
            <summary>⚙️ Registrar Nueva Habitación (Panel Admin)</summary>
            <form className="room-form-alzau" onSubmit={handleSubmit}>
              <input 
                placeholder="N° Hab" 
                value={newRoom.number}
                onChange={(e) => setNewRoom({...newRoom, number: e.target.value})}
                required 
              />
              <input 
                placeholder="Precio ($)" 
                type="number"
                value={newRoom.price_per_night}
                onChange={(e) => setNewRoom({...newRoom, price_per_night: e.target.value})}
                required 
              />
              <button type="submit" className="btn-save">Guardar Habitación</button>
            </form>
          </details>
        </section>

        {/* LISTA DE HABITACIONES: Estilo Leonardo / Profesional */}
        <section className="hotel-list">
          {rooms.map(room => (
            <article key={room.id} className="card-alzau">
              <div className="card-image">
                <img src={`https://picsum.photos/seed/${room.number}/400/300`} alt="Habitación" />
                <button className="btn-delete-float" onClick={() => deleteRoom(room.id)}>×</button>
              </div>
              
              <div className="card-details">
                <div className="details-header">
                  <div>
                    <h3>Habitación {room.number}</h3>
                    <p className="room-type-text">{room.room_type === 'SUT' ? 'Suite Alzau Imperial' : 'Confort Estándar'}</p>
                  </div>
                  <div className="rating-container">
                    <span className="rating-text">Excepcional</span>
                    <span className="rating-score">9.5</span>
                  </div>
                </div>

                <div className="amenities-list">
                  <span>🍷 Copa de cortesía</span>
                  <span>🥐 Desayuno Chapaco</span>
                  <span>📶 WiFi</span>
                </div>

                <div className="price-booking-section">
                  <div className="price-display">
                    <span className="price-tag">${room.price_per_night}</span>
                    <span className="price-period">por noche</span>
                  </div>
                  <button 
                    onClick={() => toggleAvailability(room)}
                    className={`status-btn ${room.is_available ? 'is-free' : 'is-busy'}`}
                  >
                    {room.is_available ? 'Reservar Ahora' : 'Ocupada'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>

      <footer className="footer-alzau">
        <p>© 2026 Hotel El Alzau - Tarija, Bolivia. ¡Te esperamos con un vinito!</p>
      </footer>
    </div>
  );
}

export default App;