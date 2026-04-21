import { useEffect, useState } from "react";

import type { Game } from "./types/Game";
import type { Giveaway } from "./types/Giveaway";

import { useFavorites } from "./hooks/useFavorites";

import { fetchGames } from "./services/fetchGames";
import { fetchGiveaways } from "./services/fetchGiveaways";

import GameCard from "./components/GameCard";
import GiveawayCard from "./components/GiveawayCard";
import RewardCard from "./components/RewardCard";
import BetaCard from "./components/BetaCard";

import "./styles/fonts.css";
import "./styles/theme.css";
import "./styles/header.css";
import "./styles/grid.css";
import "./styles/card.css";

function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [giveaways, setGiveaways] = useState<Giveaway[]>([]);

  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    // FreeToGame (Juegos gratis)
    fetchGames().then(setGames);

    // GamerPower (Regalos)
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
    <div>
      <div className="container">
        <h1>🎮 Bienvenido! 🎮</h1>

        <h2>Juegos gratis:</h2>
        <div className="grid">
          {gamesList.map(game => (
            <GameCard
              key={game.id}
              item={game}
              isFavorite={isFavorite(getId("game", game.id))}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>

        <h2>🆓 Juegos regalandose:</h2>
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

        <h2>🎁 Recompensas gratis en juegos:</h2>
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

        <h2>🧪 Betas gratis:</h2>
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
      </div>
    </div>
  );
}

export default Home;