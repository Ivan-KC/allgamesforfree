import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "../styles/layout/header.css";

export default function Header({ darkMode, setDarkMode }: any) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      <Link to="/">
        <div className="logo">Todos los Juegos Gratis</div>
      </Link>

      <nav>
        <Link to="/games">
          Juegos
        </Link>

        <Link to="/giveaways?filter=game">
          Giveaways
        </Link>

        <Link to="/giveaways?filter=loot">
          Recompensas
        </Link>

        <Link to="/giveaways?filter=beta">
          Betas
        </Link>

      </nav>

      {/* Menú desplegable */}
      <div className="menu-container" ref={menuRef}>
        <button
          className={`menu-btn ${open ? "active" : ""}`}
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {open && (
          <div className="dropdown-menu">

            {/* Links principales (solo visibles en mobile) */}
            <div className="mobile-links">
              <Link to="/games" onClick={() => setOpen(false)}>
                🎮 Juegos
              </Link>

              <Link to="/giveaways?filter=game" onClick={() => setOpen(false)}>
                🎁 Giveaways
              </Link>

              <Link to="/giveaways?filter=loot" onClick={() => setOpen(false)}>
                💰 Recompensas
              </Link>

              <Link to="/giveaways?filter=beta" onClick={() => setOpen(false)}>
                🧪 Betas
              </Link>
            </div>

            <Link to="/favorites" onClick={() => setOpen(false)}>
              ⭐ Favoritos
            </Link>

            <Link to="/history" onClick={() => setOpen(false)}>
              🕘 Historial
            </Link>

            <button
              onClick={() => {
                setDarkMode(!darkMode);
                setOpen(false);
              }}
            >
              {darkMode ? "🌙 Modo oscuro" : "☀️ Modo claro"}
            </button>

            <Link to="/contacto" onClick={() => setOpen(false)}>
              📩 Contacto
            </Link>
          </div>
        )}
      </div>

    </header>
  );
}