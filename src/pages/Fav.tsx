import { useEffect, useState } from "react";

import type { Game } from "../types/Game";
import type { Giveaway } from "../types/Giveaway";

import { fetchGames } from "../services/fetchGames";
import { fetchGiveaways } from "../services/fetchGiveaways";

import { useFavorites } from "../hooks/useFavorites";

import GameCard from "../components/GameCard";
import GiveawayCard from "../components/GiveawayCard";
import RewardCard from "../components/RewardCard";
import BetaCard from "../components/BetaCard";
import Background from "../components/Background";

import "../styles/fonts.css";
import "../styles/theme.css";
import "../styles/header.css";
import "../styles/grid.css";
import "../styles/card.css";
import "../styles/favorites.css";

function Favorites() {
  const [games, setGames] = useState<Game[]>([]);
  const [giveaways, setGiveaways] = useState<Giveaway[]>([]);

  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    fetchGames().then(setGames);
    fetchGiveaways().then(setGiveaways);
  }, []);

  const getId = (type: string, id: number) =>
    `${type}-${id}`;

  // 🔥 FILTROS CORRECTOS
  const favoriteGames = games.filter(game =>
    favorites.includes(getId("game", game.id))
  );

  const favoriteGiveaways = giveaways.filter(g =>
    favorites.includes(getId("giveaway", g.id)) &&
    g.type === "Game"
  );

  const favoriteRewards = giveaways.filter(g =>
    favorites.includes(getId("giveaway", g.id)) &&
    g.type === "DLC"
  );

  const favoriteBetas = giveaways.filter(g =>
    favorites.includes(getId("giveaway", g.id)) &&
    g.type === "Early Access"
  );

  return (
    <div>
      <Background />

      <div className="container">
        <h1>⭐ Tus Favoritos</h1>

        {/* 🎮 GAMES */}
        <section>
          <h2>Juegos</h2>

          {favoriteGames.length === 0 ? (
            <p className="empty-message">
              🎮 No tenés juegos favoritos aún<br />
              <span>Agregá juegos tocando el ❤️</span>
            </p>
          ) : (
            <div className="grid">
              {favoriteGames.map(game => (
                <GameCard
                  key={game.id}
                  item={game}
                  isFavorite={isFavorite(getId("game", game.id))}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}
        </section>

        {/* 🎁 GIVEAWAYS */}
        <section>
          <h2>Giveaways</h2>

          {favoriteGiveaways.length === 0 ? (
            <p className="empty-message">
              🎁 No tenés giveaways favoritos aún<br />
              <span>Explorá regalos y tocá el ❤️</span>
            </p>
          ) : (
            <div className="grid">
              {favoriteGiveaways.map(giveaway => (
                <GiveawayCard
                  key={giveaway.id}
                  item={giveaway}
                  isFavorite={isFavorite(getId("giveaway", giveaway.id))}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}
        </section>

        {/* 🎁 REWARDS */}
        <section>
          <h2>Recompensas</h2>

          {favoriteRewards.length === 0 ? (
            <p className="empty-message">
              🎁 No tenés recompensas favoritas aún<br />
              <span>Explorá DLCs gratis y tocá el ❤️</span>
            </p>
          ) : (
            <div className="grid">
              {favoriteRewards.map(giveaway => (
                <RewardCard
                  key={giveaway.id}
                  item={giveaway}
                  isFavorite={isFavorite(getId("giveaway", giveaway.id))}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}
        </section>

        {/* 🧪 BETAS */}
        <section>
          <h2>Betas</h2>

          {favoriteBetas.length === 0 ? (
            <p className="empty-message">
              🧪 No tenés betas favoritas aún<br />
              <span>Explorá accesos anticipados y tocá el ❤️</span>
            </p>
          ) : (
            <div className="grid">
              {favoriteBetas.map(giveaway => (
                <BetaCard
                  key={giveaway.id}
                  item={giveaway}
                  isFavorite={isFavorite(getId("giveaway", giveaway.id))}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}

export default Favorites;