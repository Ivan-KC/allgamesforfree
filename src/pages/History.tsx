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

  const historyItems = history
    .map(h => {
      if (h.type === "game") {
        const game = games.find(g => g.id === h.id);
        if (!game) return null;

        return {
          type: "game",
          data: game
        };
      }

      if (h.type === "giveaway") {
        const giveaway = giveaways.find(g => g.id === h.id);
        if (!giveaway) return null;

        return {
          type: "giveaway",
          data: giveaway
        };
      }

      return null;
    })
    .filter(Boolean) as (
      | { type: "game"; data: Game }
      | { type: "giveaway"; data: Giveaway }
    )[];

  return (
    <div className="container">
      <div className="history-heading">
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

      {historyItems.length === 0 ? (
        <div className="message">
          <h3>No hay historial todavía.</h3>
          <p>Hace click en juegos o giveaways para verlos acá.</p>
        </div>
      ) : (
        <div className="grid">
          {historyItems.map((item, i) => {
            if (item.type === "game") {
              return (
                <GameCard
                  key={`game-${item.data.id}-${i}`}
                  item={item.data}
                  isFavorite={isFavorite(`game-${item.data.id}`)}
                  onToggleFavorite={removeFavorite}
                />
              );
            }

            const Component = getGiveawayComponent(item.data);

            return (
              <Component
                key={`giveaway-${item.data.id}-${i}`}
                item={item.data}
                isFavorite={isFavorite(`giveaway-${item.data.id}`)}
                onToggleFavorite={removeFavorite}
              />
            );
          })}
        </div>
      )}

    </div>
  );
}