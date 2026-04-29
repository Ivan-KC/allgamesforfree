import { useEffect, useState } from "react";
import { getHistory, clearHistory } from "../utils/history";

import type { Game } from "../types/Game";
import type { Giveaway } from "../types/Giveaway";
import { fetchGames } from "../services/fetchGames";
import { fetchGiveaways } from "../services/fetchGiveaways";
import type { HistoryItem } from "../utils/history";
import { useFavorites } from "../utils/useFavorites";
import { getGiveawayComponent } from "../utils/getGiveawayComponent";

import GameCard from "../components/GameCard";

import "../styles/pages/history.css"

export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [giveaways, setGiveaways] = useState<Giveaway[]>([]);

  const { removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    setHistory(getHistory());
    fetchGames().then(setGames);
    fetchGiveaways().then(setGiveaways);
  }, []);

  const historyGames = history
    .filter(h => h.type === "game")
    .map(h => games.find(g => g.id === h.id))
    .filter((g): g is Game => g !== undefined);

  const historyGiveaways = history
    .filter(h => h.type === "giveaway")
    .map(h => giveaways.find(g => g.id === h.id))
    .filter((g): g is Giveaway => g !== undefined);

  return (
    <div className="container">
      <div className="history-header">
        <h1>Historial</h1>
        {history.length !== 0 && (
          <button onClick={() => {
            clearHistory();
            setHistory([]);
          }}>
            Limpiar historial
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="message">
          <h3>No hay historial todavía.</h3>
          <p>Hace click en juegos o giveaways para verlos acá.</p>
        </div>
      ) : (
        <>
          {/* Juegos */}
          {historyGames.length > 0 && (
            <section>
              <h2>Juegos vistos</h2>
              <div className="grid">
                {historyGames.map(game => (
                  <GameCard
                    key={game.id}
                    item={game}
                    isFavorite={isFavorite(`game-${game.id}`)}
                    onToggleFavorite={removeFavorite}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Giveaways */}
          {historyGiveaways.length > 0 && (
            <section>
              <h2>Giveaways vistos</h2>
              <div className="grid">
                {historyGiveaways.map(g => {
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
          )}
        </>
      )}
    </div>
  );
}