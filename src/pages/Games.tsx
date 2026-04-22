import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import type { Game } from "../types/Game";
import { fetchGames } from "../services/fetchGames";

import { useFavorites } from "../hooks/useFavorites";

import GameCard from "../components/GameCard";
import Background from "../components/Background";

import "../styles/grid.css";
import "../styles/card.css";
import "../styles/search.css";

function Games() {
  const [games, setGames] = useState<Game[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  const { toggleFavorite, isFavorite } = useFavorites();

  const filter = searchParams.get("filter") || "all";

  useEffect(() => {
    fetchGames().then(setGames);
  }, []);

  const genres = ["all", "shooter", "rpg", "strategy", "action"];

  const filteredByGenre =
    filter === "all"
      ? games
      : games.filter(g =>
          g.genre?.toLowerCase().includes(filter)
        );

  const finalGames = filteredByGenre.filter(game =>
    game.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Background />

      <div className="container">
        <h1>🎮 Juegos</h1>

        {/* TOOLBAR */}
        <div className="games-toolbar">

          {/* SEARCH */}
          <input
            className="search-input"
            type="text"
            placeholder="Buscar juegos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* FILTERS */}
          <div className="filters">
            {genres.map(g => (
              <button
                key={g}
                onClick={() => setSearchParams({ filter: g })}
                className={
                  filter === g
                    ? "filter-btn active"
                    : "filter-btn"
                }
              >
                {g.toUpperCase()}
              </button>
            ))}
          </div>

        </div>

        {/* GRID */}
        <div className="grid">
          {finalGames.map(game => (
            <GameCard
              key={game.id}
              item={game}
              isFavorite={isFavorite(`game-${game.id}`)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Games;