import { Link } from "react-router-dom";

export default function Header({ darkMode, setDarkMode }: any) {
  return (
    <header className="header">
      <div className="logo">
        🎮 <p>Todos los Juegos Gratis</p>
      </div>

      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/">Juegos</Link>
        <Link to="/">Giveaways</Link>
        <Link to="/">Recompensas</Link>
        <Link to="/">Betas</Link>
        <Link to="/contacto">Contacto</Link>
      </nav>

      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️" : "🌙"}
      </button>
    </header>
  );
}