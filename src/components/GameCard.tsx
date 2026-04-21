import type { Game } from "../types/Game";
import type { FavoriteProps } from "../types/FavoriteProps";

type Props = FavoriteProps<Game>;

export default function GameCard({ item, isFavorite, onToggleFavorite }: Props) {
  return (
    <article className="card">
      <a href={item.game_url} target="_blank" className="card-link">

        <div className="card-media">
          <img src={item.thumbnail} alt={item.title} />
        </div>

        <div className="card-content">
          <h3>{item.title}</h3>
          <p>{item.short_description}</p>
        </div>
      </a>
      <button
        className="favorite-btn"
        onClick={(e) => {
          e.preventDefault();
          onToggleFavorite(`game-${item.id}`)
        }}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>
    </article>
  );
}