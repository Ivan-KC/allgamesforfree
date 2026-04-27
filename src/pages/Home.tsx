import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import type { Game } from "../types/Game";
import type { Giveaway } from "../types/Giveaway";
import { fetchGames } from "../services/fetchGames";
import { fetchGiveaways } from "../services/fetchGiveaways";

import { useFavorites } from "../hooks/useFavorites";

import GameCard from "../components/GameCard";
import GiveawayCard from "../components/GiveawayCard";
import RewardCard from "../components/RewardCard";
import BetaCard from "../components/BetaCard";

import "../styles/fonts.css";
import "../styles/theme.css";
import "../styles/components/section.css";
import "../styles/components/grid.css";
import "../styles/components/card.css";

function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [giveaways, setGiveaways] = useState<Giveaway[]>([]);

  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    // Juegos gratis
    fetchGames().then(setGames);

    // Giveaways
    fetchGiveaways().then(setGiveaways);
  }, []);

  const gamesList = games.slice(0, 10);

  const giveawaysGames = giveaways
    .filter(g => g.type === "Game")
    .slice(0, 10);

  const rewards = giveaways
    .filter(g => g.type === "DLC")
    .slice(0, 5);

  const betas = giveaways
    .filter(g => g.type === "Early Access")
    .slice(0, 5);

  const getId = (type: string, id: number) =>
    `${type}-${id}`;

  return (
    <div className="container">

      <h1>🎮 Bienvenido! 🎮</h1>
      <section>
        <div className="section-header">
          <h2>Juegos Free to Play</h2>
          <Link to="/games" className="see-more">
            Ver más <span>→</span>
          </Link>
        </div>

        <div className="grid">
          {gamesList.map(game => (
            <GameCard
              key={game.id}
              item={game}
              isFavorite={isFavorite(
                getId("game", game.id)
              )}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </section>

      <section>
        <div className="section-header">
          <h2>Juegos regalándose</h2>
          <Link to="/giveaways" className="see-more">
            Ver más <span>→</span>
          </Link>
        </div>
        <div className="grid">
          {giveawaysGames.map(giveaway => (
            <GiveawayCard
              key={giveaway.id}
              item={giveaway}
              isFavorite={isFavorite(
                getId("giveaway", giveaway.id)
              )}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </section>

      <section>
        <div className="section-header">
          <h2>Recompensas gratis en juegos</h2>
          <Link to="/rewards" className="see-more">
            Ver más <span>→</span>
          </Link>
        </div>
        <div className="grid">
          {rewards.map(giveaway => (
            <RewardCard
              key={giveaway.id}
              item={giveaway}
              isFavorite={isFavorite(
                getId("giveaway", giveaway.id)
              )}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </section>

      <section>
        <div className="section-header">
          <h2>Betas abiertas</h2>
          <Link to="/betas" className="see-more">
            Ver más <span>→</span>
          </Link>
        </div>
        <div className="grid">
          {betas.map(giveaway => (
            <BetaCard
              key={giveaway.id}
              item={giveaway}
              isFavorite={isFavorite(
                getId("giveaway", giveaway.id)
              )}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;