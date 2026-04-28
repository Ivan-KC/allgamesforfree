import { Link } from "react-router-dom";
import "../styles/layout/footer.css";

import facebook from "../assets/socials/facebook.png"
import github from "../assets/socials/github.png"
import instagram from "../assets/socials/instagram.png"
import youtube from "../assets/socials/youtube.png"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-left">
          <h3>All Games for Free</h3>
          <p>Descubrí juegos gratis, giveaways y más.</p>
          <hr></hr>
          <span>APIs utilizadas:</span>
          <p>
            <a href="https://freetogame.com" target="_blank" rel="noopener noreferrer">FreeToGame</a>
          </p>
          <p>
            <a href="https://www.gamerpower.com" target="_blank" rel="noopener noreferrer">GamerPower</a>
          </p>
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

            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="icon">
              <img src={github} alt="GitHub" />
            </a>

            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="icon">
              <img src={facebook} alt="Facebook" />
            </a>

            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="icon">
              <img src={instagram} alt="Instagram" />
            </a>

            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="icon">
              <img src={youtube} alt="YouTube" />
            </a>

          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} FreeGames — Todos los derechos reservados

        ©

        ©
      </div>
    </footer>
  );
}