import type { Giveaway } from "../types/Giveaway";

export default function GiveawayCard({ giveaway }: { giveaway: Giveaway }) {
  return (
    <article className="card">
      <a href={giveaway.open_giveaway_url} target="_blank" className="card-link">

        <div className="card-media">
          <img src={giveaway.thumbnail} alt={giveaway.title} />
          <button className="favorite-btn">♥</button>
        </div>

        <div className="card-content">
          <h3>{giveaway.title}</h3>
          <p>{giveaway.description}</p>

          <div className="tags">
            <span className="tag">{giveaway.platforms}</span>
          </div>

          <span className="badge">{giveaway.worth}</span>
        </div>
      </a>
    </article>
  );
}
