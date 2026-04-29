import { useEffect, useState } from "react";

import type { Game } from "../types/Game";
import type { Giveaway } from "../types/Giveaway";
import { fetchGames } from "../services/fetchGames";
import { fetchGiveaways } from "../services/fetchGiveaways";
import { useFavorites } from "../utils/useFavorites";
import { getGiveawayComponent } from "../utils/getGiveawayComponent";

import GameCard from "../components/GameCard";

import "../styles/pages/favorites.css";

function Favorites() {
  const [games, setGames] = useState<Game[]>([]);
  const [giveaways, setGiveaways] = useState<Giveaway[]>([]);

  const { collections, isFavorite, removeFavorite, clearCollection, deleteCollection } = useFavorites();

  useEffect(() => {
    fetchGames().then(setGames);
    fetchGiveaways().then(setGiveaways);
  }, []);

  const hasFavorites = Object.values(collections).some(
    ids => ids.length > 0
  );

  return (
    <div className="container">
      <div className="heading">
        <h1>Tus Favoritos</h1>
      </div>

      {!hasFavorites ? (
        <div className="message">
          <h3>No tenés favoritos todavía.</h3>
          <p>Guardá juegos o giveaways para verlos acá.</p>
        </div>
      ) : (
        Object.entries(collections).map(([name, ids]) => {

          const gamesInCollection = games.filter(g =>
            ids.includes(`game-${g.id}`)
          );

          const giveawaysInCollection = giveaways.filter(g =>
            ids.includes(`giveaway-${g.id}`)
          );

          if (
            gamesInCollection.length === 0 &&
            giveawaysInCollection.length === 0
          ) {
            return null;
          }

          return (
            <section key={name}>
              <div className="collection-heading">
                <h2>📁 {name}</h2>

                <button
                  className="clear-btn"
                  onClick={() => {
                    if (confirm(`¿Vaciar la colección "${name}"?`)) {
                      clearCollection(name);
                    }
                  }}
                >
                  Limpiar
                </button>

                {name !== "Favoritos" && (
                  <button
                    className="delete-btn"
                    onClick={() => {
                      if (confirm(`¿Eliminar la colección "${name}"?`)) {
                        deleteCollection(name);
                      }
                    }}
                  >
                    Eliminar
                  </button>
                )}
              </div>

              <div className="grid">
                {gamesInCollection.map(game => (
                  <GameCard
                    key={game.id}
                    item={game}
                    isFavorite={isFavorite(`game-${game.id}`)}
                    onToggleFavorite={removeFavorite}
                  />
                ))}

                {giveawaysInCollection.map(g => {
                  const Component = getGiveawayComponent(g);

                  return (
                    <Component
                      key={g.id}
                      item={g}
                      isFavorite={isFavorite(`giveaway-${g.id}`)}
                      onToggleFavorite={removeFavorite}
                    />
                  );
                })}
              </div>
            </section>
          );
        })
      )}
    </div>
  );
}

export default Favorites;