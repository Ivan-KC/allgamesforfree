import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import type { Giveaway } from "../types/Giveaway";
import { fetchGiveaways } from "../services/fetchGiveaways";

import { useFavorites } from "../hooks/useFavorites";

import GiveawayCard from "../components/GiveawayCard";
import Background from "../components/Background";

import "../styles/grid.css";
import "../styles/card.css";
import "../styles/search.css";

function Giveaways() {
  const [giveaways, setGiveaways] = useState<Giveaway[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  const { toggleFavorite, isFavorite } = useFavorites();

  const filter = searchParams.get("filter") || "all";

  useEffect(() => {
    fetchGiveaways().then(setGiveaways);
  }, []);

  const categories = ["all", "game", "dlc", "early access"];

  // 🎁 TODOS LOS GIVEAWAYS
  const filteredByType =
    filter === "all"
      ? giveaways
      : giveaways.filter(g =>
          g.type.toLowerCase().includes(filter)
        );

  // 🔍 BÚSQUEDA POR NOMBRE
  const finalGiveaways = filteredByType.filter(g =>
    g.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Background />

      <div className="container">
        <h1>🎁 Giveaways</h1>

        {/* TOOLBAR */}
        <div className="games-toolbar">

          {/* SEARCH */}
          <input
            className="search-input"
            type="text"
            placeholder="Buscar giveaways..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* FILTERS */}
          <div className="filters">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setSearchParams({ filter: c })}
                className={
                  filter === c
                    ? "filter-btn active"
                    : "filter-btn"
                }
              >
                {c.toUpperCase()}
              </button>
            ))}
          </div>

        </div>

        {/* GRID */}
        <div className="grid">
          {finalGiveaways.map(giveaway => (
            <GiveawayCard
              key={giveaway.id}
              item={giveaway}
              isFavorite={isFavorite(`giveaway-${giveaway.id}`)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Giveaways;