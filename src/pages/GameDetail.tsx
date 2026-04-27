import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import type { Game } from "../types/Game";
import type { GameDetail } from "../types/GameDetail";
import { fetchGameById } from "../services/fetchGameById";
import { fetchGames } from "../services/fetchGames";
import { useFavorites } from "../hooks/useFavorites";
import { addToHistory } from "../utils/history";

import GameCard from "../components/GameCard";
import ImageWithLoader from "../components/ImageWithLoader";

import "../styles/pages/detail.css";
import "../styles/components/spinner.css";

export default function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState<GameDetail | null>(null);
  const { toggleFavorite, isFavorite } = useFavorites();
  const [relatedGames, setRelatedGames] = useState<Game[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const requirements = game?.minimum_system_requirements;
  const hasRequirements =
    requirements &&
    Object.values(requirements).some(value => value !== null && value !== "");


  const formatGenre = (genre: string) =>
    genre.replace(/\s+/g, "-");

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("es-AR", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

  useEffect(() => {
    if (!id) return;

    fetchGameById(id)
      .then(setGame)
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    if (!game) return;

    fetchGames({
      filter: formatGenre(game.genre)
    })
      .then(data => {
        const filtered = data
          .filter((g: Game) => g.id !== game.id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 5);

        setRelatedGames(filtered);
      })
      .catch(console.error);

  }, [game]);

  useEffect(() => {
    if (!game) return;

    addToHistory({
      id: game.id,
      type: "game",
      title: game.title,
      image: game.thumbnail
    });

  }, [game]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedImage]);


  if (!game) return <div className="loading">Cargando...</div>;

  const favId = `game-${game.id}`;

  return (
    <div className="detail-container">

      <div className="detail-hero">
        <img src={game.thumbnail} />

        <div className="detail-info">
          <h1>{game.title}</h1>

          <p>{game.short_description}</p>

          <div className="detail-actions">
            <a href={game.game_url} target="_blank">
              Jugar ahora
            </a>

            <button onClick={() => toggleFavorite(favId)}>
              {isFavorite(favId) ? "Sacar de favoritos ❤️" : "Agregar a favoritos 🤍"}
            </button>
          </div>
        </div>
      </div>

      <section className="game-details">
        <h2>Detalles del juego</h2>

        <div className="details-grid">
          <div className="detail-item">
            <span className="label">Género</span>
            <span className="value">{game.genre}</span>
          </div>

          <div className="detail-item">
            <span className="label">Plataforma</span>
            <span className="value">{game.platform}</span>
          </div>

          <div className="detail-item">
            <span className="label">Desarrollador</span>
            <span className="value">{game.developer}</span>
          </div>

          <div className="detail-item">
            <span className="label">Editor</span>
            <span className="value">{game.publisher}</span>
          </div>

          <div className="detail-item">
            <span className="label">Fecha de lanzamiento</span>
            <span className="value">{formatDate(game.release_date)}</span>
          </div>

          <div className="detail-item">
            <span className="label">Estado</span>
            <span className="value">{game.status}</span>
          </div>
        </div>
      </section>

      <section>
        <h2>Descripción</h2>
        {game.description
          .split(/\r?\n\r?\n/)
          .map((p, i) => <p key={i}>{p}</p>)
        }
      </section>

      <section>
        <h2>Imágenes</h2>

        {!game.screenshots || game.screenshots.length === 0 ? (
          <p className="empty-message">
            📷 No hay imágenes disponibles
          </p>
        ) : (
          <div className="screenshots">
            {game.screenshots.map(s => (
              <ImageWithLoader
                key={s.id}
                src={s.image}
                onClick={() => setSelectedImage(s.image)}
              />
            ))}
          </div>
        )}
      </section>

      {hasRequirements && (
        <section>
          <h2>Requisitos mínimos</h2>

          <ul className="requirements">
            <li><strong>OS:</strong> {requirements.os}</li>
            <li><strong>CPU:</strong> {requirements.processor}</li>
            <li><strong>RAM:</strong> {requirements.memory}</li>
            <li><strong>GPU:</strong> {requirements.graphics}</li>
            <li><strong>Storage:</strong> {requirements.storage}</li>
          </ul>
        </section>
      )}

      <section>
        <div className="section-header">
          <h2>Juegos similares</h2>

          <Link
            to={`/games?filter=${formatGenre(game.genre)}`}
            className="see-more"
          >
            Ver más <span>→</span>
          </Link>
        </div>

        {relatedGames.length === 0 ? (
          <p>No hay juegos similares 😢</p>
        ) : (
          <div className="grid">
            {relatedGames.map(g => (
              <GameCard
                key={g.id}
                item={g}
                isFavorite={isFavorite(`game-${g.id}`)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}
      </section>

      {/* Modal de las imagenes */}
      {selectedImage && (
        <div
          className="image-modal"
          onClick={() => setSelectedImage(null)}
        >
          <img src={selectedImage} />
        </div>
      )}

    </div>
  );
}