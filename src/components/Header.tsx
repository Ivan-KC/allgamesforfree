import { Link } from "react-router-dom";

export default function Header({ darkMode, setDarkMode }: any) {
  return (
    <header className="header">
      <div className="logo">
        🎮 <p>Todos los Juegos Gratis</p>
      </div>

      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/games">Juegos</Link>
        <Link to="/giveaways">Giveaways</Link>
        <Link to="/Rewards">Recompensas</Link>
        <Link to="/betas">Betas</Link>
        <Link to="/favorites">Favoritos</Link>
        <Link to="/contacto">Contacto</Link>
      </nav>

      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️" : "🌙"}
      </button>
    </header>
  );
}