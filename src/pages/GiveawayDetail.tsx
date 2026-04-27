import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import type { Giveaway } from "../types/Giveaway";
import { fetchGiveawayById } from "../services/fetchGiveawayById";
import { fetchGiveaways } from "../services/fetchGiveaways";
import { useFavorites } from "../hooks/useFavorites";
import { addToHistory } from "../utils/history";

import GiveawayCard from "../components/GiveawayCard";

export default function GiveawayDetail() {
  const { id } = useParams();
  const [item, setItem] = useState<Giveaway | null>(null);
  const { toggleFavorite, isFavorite } = useFavorites();
  const [relatedGiveaways, setRelatedGiveaways] = useState<Giveaway[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("es-AR", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

  useEffect(() => {
    if (!id) return;

    fetchGiveawayById(id)
      .then(setItem)
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    if (!item) return;

    fetchGiveaways()
      .then(data => {
        const filtered = data
          .filter((g: Giveaway) =>
            g.id !== item.id && g.type === item.type
          )
          .sort(() => 0.5 - Math.random())
          .slice(0, 5);

        setRelatedGiveaways(filtered);
      })
      .catch(console.error);

  }, [item]);

  useEffect(() => {
    if (!item) return;

    addToHistory({
      id: item.id,
      type: "giveaway",
      title: item.title,
      image: item.image
    });
  }, [item]);

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

  if (!item) return <p>Cargando...</p>;

  const favId = `giveaway-${item.id}`;

  const instructionsList = item.instructions
    ?.split(/\r?\n/)
    .filter(Boolean);

  const hasValidEndDate =
    item.end_date &&
    item.end_date !== "N/A" &&
    !isNaN(new Date(item.end_date).getTime());

  return (
    <div className="detail-container">

      <div className="detail-hero">
        <img
          src={item.image}
          onClick={() => setSelectedImage(item.image)}
          style={{ cursor: "zoom-in" }}
        />

        <div className="detail-info">
          <h1>{item.title}</h1>

          <p>{item.description}</p>

          <div className="detail-actions">
            <a href={item.open_giveaway_url} target="_blank">
              Reclamar ahora
            </a>

            <button onClick={() => toggleFavorite(favId)}>
              {isFavorite(favId)
                ? "Sacar de favoritos ❤️"
                : "Agregar a favoritos 🤍"}
            </button>
          </div>
        </div>
      </div>

      {/* Detalles */}
      <section className="game-details">
        <h2>Detalles del giveaway</h2>

        <div className="details-grid">

          <div className="detail-item">
            <span className="label">Valor</span>
            <span className="value">{item.worth}</span>
          </div>

          <div className="detail-item">
            <span className="label">Tipo</span>
            <span className="value">{item.type}</span>
          </div>

          <div className="detail-item">
            <span className="label">Plataformas</span>
            <span className="value">{item.platforms}</span>
          </div>

          <div className="detail-item">
            <span className="label">Publicado</span>
            <span className="value">{formatDate(item.published_date)}</span>
          </div>

          {hasValidEndDate && (
            <div className="detail-item">
              <span className="label">Finaliza</span>
              <span className="value">{formatDate(item.end_date)}</span>
            </div>
          )}

          <div className="detail-item">
            <span className="label">Estado</span>
            <span className="value">{item.status}</span>
          </div>

          <div className="detail-item">
            <span className="label">Reclamado por</span>
            <span className="value">{item.users.toLocaleString()} usuarios</span>
          </div>

        </div>
      </section>

      {/* Instrucciones */}
      <section>
        <h2>Cómo obtenerlo</h2>

        {!instructionsList?.length ? (
          <p>No hay instrucciones disponibles</p>
        ) : (
          <ul className="requirements">
            {instructionsList.map((line, i) => (
              <li key={i}>
                {line.startsWith("http") ? (
                  <a href={line} target="_blank">
                    {line}
                  </a>
                ) : (
                  line
                )}
              </li>
            ))}
          </ul>
        )}

      </section>

      <section>
        <div className="section-header">
          <h2>Giveaways similares</h2>

          <Link
            to={`/giveaways?filter=${item.type.toLowerCase()}`}
            className="see-more"
          >
            Ver más <span>→</span>
          </Link>
        </div>

        {relatedGiveaways.length === 0 ? (
          <p>No hay giveaways similares 😢</p>
        ) : (
          <div className="grid">
            {relatedGiveaways.map(g => (
              <GiveawayCard
                key={g.id}
                item={g}
                isFavorite={isFavorite(`giveaway-${g.id}`)}
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