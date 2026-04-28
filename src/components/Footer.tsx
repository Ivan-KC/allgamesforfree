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
          <a href="#">Inicio</a>
          <a href="#">Juegos</a>
          <a href="#">Giveaways</a>
          <a href="#">Favoritos</a>
        </div>

        <div className="footer-right">
          <a href="#" className="icon github">🐙</a>
          <a href="#" className="icon twitter">🐦</a>
          <a href="#" className="icon instagram">📸</a>
          <a href="#" className="icon youtube">▶️</a>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} FreeGames — Todos los derechos reservados
      </div>
    </footer>
  );
}