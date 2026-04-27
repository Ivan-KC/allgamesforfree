import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import type { Giveaway } from "../types/Giveaway";
import type { FavoriteProps } from "../types/FavoriteProps";
import ImageWithLoader from "./ImageWithLoader";

type Props = FavoriteProps<Giveaway>;

export default function GiveawayCard({ item, isFavorite, onToggleFavorite }: Props) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

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
          <div
            ref={textRef}
            className={isOverflowing ? "card-text fade" : "card-text"}
          >
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>

          <div className="tags">
            <span className="tag">{item.platforms}</span>
          </div>

          <div className="price"><span>Gratis</span><p>{item.worth}</p></div>
        </div>
      </Link>
      <button
        className="favorite-btn"
        onClick={(e) => {
          e.preventDefault();
          onToggleFavorite(`giveaway-${item.id}`)
        }}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>
    </article>
  );
}
