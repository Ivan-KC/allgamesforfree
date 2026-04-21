export default function Header({ darkMode, setDarkMode }: any) {
  return (
    <header className="header">
      <div className="logo">🎮 <p>Todos los Juegos Gratis</p>
      </div>

      <nav>
        <a href="#">Inicio</a>
        <a href="#">Juegos</a>
        <a href="#">Giveaways</a>
        <a href="#">Recompensas</a>
        <a href="#">Betas</a>
      </nav>

      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️" : "🌙"}
      </button>
    </header>
  );
}