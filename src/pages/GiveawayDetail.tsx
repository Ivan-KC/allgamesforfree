import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

import type { Giveaway } from "../types/Giveaway";
import { fetchGiveawayById } from "../services/fetchGiveawayById";
import { fetchGiveaways } from "../services/fetchGiveaways";
import { useFavorites } from "../utils/useFavorites";
import { addToHistory } from "../utils/history";

import { getGiveawayComponent } from "../utils/getGiveawayComponent";

export default function GiveawayDetail() {
  const { id } = useParams();
  const [item, setItem] = useState<Giveaway | null>(null);
  const [relatedGiveaways, setRelatedGiveaways] = useState<Giveaway[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { isFavorite, removeFavorite } = useFavorites();

  const ctx = useOutletContext<any>();
  const openFavoritesModal = ctx?.openFavoritesModal;

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

  if (!item) return <div className="loading"><p className="message">Cargando...</p></div>;

  const favId = `giveaway-${item.id}`;

  const instructionsList = item.instructions
    ?.split(/\r?\n/)
    .filter(Boolean);

  const hasValidEndDate =
    item.end_date &&
    item.end_date !== "N/A" &&
    !isNaN(new Date(item.end_date).getTime());

  const getClaimText = (type?: string) => {
    switch (type?.toLowerCase()) {
      case "game":
        return "Reclamar ahora";

      case "dlc":
        return "Obtener recompensa";

      case "early access":
        return "Acceder a la beta";

      default:
        return "Reclamar";
    }
  };

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
              {getClaimText(item.type)}
            </a>

            <button
              onClick={() => {
                if (isFavorite(favId)) {
                  removeFavorite(favId);
                } else {
                  openFavoritesModal(favId);
                }
              }}
            >
              <span className={`heart ${isFavorite(favId) ? "active" : ""}`}>
                ❤︎
              </span>
              {isFavorite(favId) ? " En favoritos" : " Agregar a favoritos"}
            </button>
          </div>
        </div>
      </div>

      {/* Detalles */}
      <section className="game-details">
        <h2>Detalles del giveaway</h2>

        <div className="details-grid">

          {item.worth !== "N/A" && (
            <div className="detail-item">
              <span className="label">Valor</span>
              <span className="value">{item.worth}</span>
            </div>
          )}

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
              <li
                key={i}
                dangerouslySetInnerHTML={{
                  __html: line.replace(
                    /<a /g,
                    '<a target="_blank" rel="noopener noreferrer" '
                  )
                }}
              />
            ))}
          </ul>
        )}

      </section>

      <section>
        <div className="section-heading">
          <h2>Giveaways similares</h2>

          <Link
            to={`/giveaways?filter=${item.type.toLowerCase()}`}
            className="see-more"
          >
            Ver más <span>→</span>
          </Link>
        </div>

        {relatedGiveaways.length === 0 ? (
          <p className="message">No hay giveaways similares.</p>
        ) : (
          <div className="grid">
            {relatedGiveaways.map(g => {
              const Component = getGiveawayComponent(g);

              return (
                <Component
                  key={g.id}
                  item={g}
                  isFavorite={isFavorite(`giveaway-${g.id}`)}
                  onToggleFavorite={removeFavorite}
                />
              );
            })}
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