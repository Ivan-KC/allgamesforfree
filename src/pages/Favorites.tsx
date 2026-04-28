import { useEffect, useState } from "react";

import type { Game } from "../types/Game";
import type { Giveaway } from "../types/Giveaway";

import { fetchGames } from "../services/fetchGames";
import { fetchGiveaways } from "../services/fetchGiveaways";

import { useFavorites } from "../utils/useFavorites";

import GameCard from "../components/GameCard";
import GiveawayCard from "../components/GiveawayCard";

import "../styles/pages/favorites.css";


function Favorites() {
  const [games, setGames] = useState<Game[]>([]);
  const [giveaways, setGiveaways] = useState<Giveaway[]>([]);

  const { collections, isFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    fetchGames().then(setGames);
    fetchGiveaways().then(setGiveaways);
  }, []);

  return (
    <div className="container">
      <h1>Tus Favoritos</h1>

      {Object.entries(collections).map(([name, ids]) => {

        const gamesInCollection = games.filter(g =>
          ids.includes(`game-${g.id}`)
        );

        const giveawaysInCollection = giveaways.filter(g =>
          ids.includes(`giveaway-${g.id}`)
        );

        if (gamesInCollection.length === 0 && giveawaysInCollection.length === 0) {
          return null;
        }

        return (
          <section key={name}>
            <h2>📁 {name}</h2>

            <div className="grid">
              {gamesInCollection.map(game => (
                <GameCard
                  key={game.id}
                  item={game}
                  isFavorite={isFavorite(`game-${game.id}`)}
                  onToggleFavorite={removeFavorite}
                />
              ))}

              {giveawaysInCollection.map(g => (
                <GiveawayCard
                  key={g.id}
                  item={g}
                  isFavorite={isFavorite(`giveaway-${g.id}`)}
                  onToggleFavorite={removeFavorite}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default Favorites;