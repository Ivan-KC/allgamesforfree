import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "../styles/pages/contact.css";

function Contact() {

  const position: [number, number] = [-34.9215, -57.9536];

  return (
    <div className="contact-container">
      <h1 className="contact-title">Contacto</h1>

      <p className="contact-subtitle">
        ¿Tenés dudas, sugerencias o querés colaborar?
        Escribinos y te respondemos lo antes posible.
      </p>

      <div className="contact-card">

        <div className="contact-info">

          <h2>Información</h2>

          <p>📧 allgamesforfree@contact.com</p>
          <p>📱 +54 11 1234-5678</p>
          <p>📍 Buenos Aires, Argentina</p>

        </div>

        {/* FORM */}
        <form className="contact-form">

          <input type="text" placeholder="Tu nombre" />
          <input type="email" placeholder="Tu email" />

          <textarea
            placeholder="Escribí tu mensaje..."
            rows={5}
          />

          <button type="submit">
            Enviar mensaje 🚀
          </button>

        </form>

      </div>

      {/* 🗺️ MAPA */}
      <div className="contact-map">

        <h2>📍 Nuestra ubicación</h2>

        <div style={{ height: "350px", width: "100%", marginTop: "10px" }}>

          <MapContainer
            center={position}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >

            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={position}>
              <Popup>📍 Estamos acá</Popup>
            </Marker>

          </MapContainer>

        </div>

      </div>

    </div>
  );
}

export default Contact;