import type { Giveaway } from "../types/Giveaway";
import type { FavoriteProps } from "../types/FavoriteProps";

type Props = FavoriteProps<Giveaway>;

export default function GiveawayCard({ item, isFavorite, onToggleFavorite }: Props) {
  return (
    <article className="card">
      <a href={item.open_giveaway_url} target="_blank" className="card-link">

        <div className="card-media">
          <img src={item.thumbnail} alt={item.title} />
        </div>

        <div className="card-content">
          <h3>{item.title}</h3>
          <p>{item.description}</p>

          <div className="tags">
            <span className="tag">{item.platforms}</span>
          </div>

          <span className="badge">{item.worth}</span>
        </div>
      </a>
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
