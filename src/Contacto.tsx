import "./styles/contact.css";

function Contacto() {
  return (
    <div className="contact-container">

      <h1 className="contact-title">
        📞 Contacto
      </h1>

      <p className="contact-subtitle">
        ¿Tenés dudas, sugerencias o querés colaborar?
        Escribinos y te respondemos lo antes posible.
      </p>

      <div className="contact-card">

        <div className="contact-info">

          <h2>Información</h2>

          <p>📧 contacto@allgames.com</p>
          <p>📱 +54 11 1234-5678</p>
          <p>📍 Buenos Aires, Argentina</p>

        </div>

        <form className="contact-form">

          <input
            type="text"
            placeholder="Tu nombre"
          />

          <input
            type="email"
            placeholder="Tu email"
          />

          <textarea
            placeholder="Escribí tu mensaje..."
            rows={5}
          />

          <button type="submit">
            Enviar mensaje 🚀
          </button>

        </form>

      </div>

    </div>
  );
}

export default Contacto;