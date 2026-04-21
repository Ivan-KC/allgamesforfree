import type { Game } from "../types/Game";

export default function GameCard({ game }: { game: Game }) {
  return (
    <article className="card">
      <a href={game.game_url} target="_blank" className="card-link">
        
        <div className="card-media">
          <img src={game.thumbnail} alt={game.title} />
          <button className="favorite-btn">♥</button>
        </div>

        <div className="card-content">
          <h3>{game.title}</h3>
          <p>{game.short_description}</p>

          <div className="tags">
            <span className="tag">{game.genre}</span>
            <span className="tag">{game.platform}</span>
          </div>
        </div>
      </a>
    </article>
  );
}