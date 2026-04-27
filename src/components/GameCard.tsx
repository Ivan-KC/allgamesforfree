import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import type { Game } from "../types/Game";
import type { FavoriteProps } from "../types/FavoriteProps";

import ImageWithLoader from "./ImageWithLoader";

type Props = FavoriteProps<Game>;

export default function GameCard({ item, isFavorite, onToggleFavorite }: Props) {
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
      <Link to={`/game/${item.id}`} className="card-link">

        <div className="card-media">
          <ImageWithLoader
            src={item.thumbnail}
            alt={item.title}
          />
        </div>

        <div className="card-content">
          <div
            ref={textRef}
            className={isOverflowing ? "card-text fade" : "card-text"}
          >
            <h3>{item.title}</h3>
            <p>{item.short_description}</p>
          </div>

          <div className="tags">
            <span className="tag">{item.genre}</span>
            <span className="tag">{item.platform}</span>
          </div>
        </div>
      </Link>
      <button
        className="favorite-btn"
        onClick={(e) => {
          e.preventDefault();

          const id = `game-${item.id}`;

          if (isFavorite) {
            onToggleFavorite(id); // Eliminar de favoritos
          } else {
            openFavoritesModal(id); // Abrir modal de favoritos
          }
        }}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>
    </article >
  );
}