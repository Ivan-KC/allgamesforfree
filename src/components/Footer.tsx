import { Link } from "react-router-dom";
import "../styles/layout/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-left">
          <h3>🎮 All Games for Free</h3>
          <p>Descubrí juegos gratis, giveaways y más.</p>
        </div>

        <div className="footer-center">
          <Link to="/">Inicio</Link>
          <Link to="/games">Juegos</Link>
          <Link to="/giveaways?filter=game">Giveaways</Link>
          <Link to="/contacto">Contacto</Link>
        </div>

        <div className="footer-right">
          <p className="social-title">Seguinos en nuestras redes:</p>

          <div className="social-icons">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="icon github">🐙</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="icon twitter">🐦</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="icon instagram">📸</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="icon youtube">▶️</a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} FreeGames — Todos los derechos reservados
      </div>
    </footer>
  );
}