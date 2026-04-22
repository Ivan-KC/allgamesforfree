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

  // FILTROS
  const favoriteGames = games.filter(game =>
    favorites.includes(getId("game", game.id))
  );

  const favoriteGiveaways = giveaways.filter(g =>
    g.type === "Game" &&
    favorites.includes(getId("giveaway", g.id))
  );

  const favoriteRewards = giveaways.filter(g =>
    g.type === "DLC" &&
    favorites.includes(getId("giveaway", g.id))
  );

  const favoriteBetas = giveaways.filter(g =>
    g.type === "Early Access" &&
    favorites.includes(getId("giveaway", g.id))
  );

  const hasNoFavorites =
    favoriteGames.length === 0 &&
    favoriteGiveaways.length === 0 &&
    favoriteRewards.length === 0 &&
    favoriteBetas.length === 0;


  console.log("RENDER FAVORITES PAGE");
  console.log("favorites:", favorites);
  console.log("hasNoFavorites:", hasNoFavorites); 
  return (
    <div>
      <Background />

      <div className="container">

        <h1>⭐ Tus Favoritos</h1>

        {hasNoFavorites ? (
          <div
            style={{
              position: "relative",
              zIndex: 10,
              textAlign: "center",
              padding: "120px 20px",
              color: "white"
            }}
          >
            <div style={{ fontSize: "60px" }}>⭐</div>

            <h2>No tenés favoritos aún</h2>

            <p style={{ opacity: 0.8 }}>
              Agregá juegos tocando el ❤️
            </p>
          </div>
        ) : (
          <>
            {/* GAMES */}
            <section>
              <h2>Juegos</h2>
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
            </section>

            {/* GIVEAWAYS */}
            <section>
              <h2>Giveaways</h2>
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
            </section>

            {/* REWARDS */}
            <section>
              <h2>Recompensas</h2>
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
            </section>

            {/* BETAS */}
            <section>
              <h2>Betas</h2>
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
            </section>
          </>
        )}

      </div>
    </div>
  );
}

export default Favorites;