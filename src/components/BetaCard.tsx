import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import type { Giveaway } from "../types/Giveaway";
import type { FavoriteProps } from "../types/FavoriteProps";

import ImageWithLoader from "./ImageWithLoader";

type Props = FavoriteProps<Giveaway>;

export default function BetaCard({ item, isFavorite, onToggleFavorite }: Props) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const ctx = useOutletContext<any>();
  const openFavoritesModal = ctx?.openFavoritesModal;

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    setIsOverflowing(el.scrollHeight > el.clientHeight);
  }, []);

  return (
    <article className="card">
      <Link to={`/giveaway/${item.id}`} className="card-link">

        <div className="card-media">
          <ImageWithLoader
            src={item.thumbnail}
            alt={item.title}
          />
        </div>

        <div className="card-content">
          <span className="card-badge">BETA</span>

          <div
            ref={textRef}
            className={isOverflowing ? "card-text fade" : "card-text"}
          >
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>

          <div className="tags">
            <span className="tag">Beta</span>
            {item.platforms
              ?.split(",")
              .map(p => p.trim())
              .filter(Boolean)
              .map((platform, i) => (
                <span key={i} className="tag">
                  {platform}
                </span>
              ))}
          </div>

          <button>Jugar ahora</button>
        </div>
      </Link>
      <button
        className="favorite-btn"
        onClick={(e) => {
          e.preventDefault();
          const id = `giveaway-${item.id}`;

          if (isFavorite) {
            onToggleFavorite(id); // Eliminar de favoritos
          } else {
            openFavoritesModal(id); // Abrir modal de favoritos
          }
        }}
      >
        <span className={`heart ${isFavorite ? "active" : ""}`}>
          ❤︎
        </span>
      </button>
    </article>
  );
}