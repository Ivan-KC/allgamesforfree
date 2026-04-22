import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import type { Giveaway } from "../types/Giveaway";
import { fetchGiveaways } from "../services/fetchGiveaways";

import { useFavorites } from "../hooks/useFavorites";

import RewardCard from "../components/RewardCard";
import Background from "../components/Background";

import "../styles/grid.css";
import "../styles/card.css";
import "../styles/search.css";

function Rewards() {
  const [giveaways, setGiveaways] = useState<Giveaway[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  const { toggleFavorite, isFavorite } = useFavorites();

  const filter = searchParams.get("filter") || "all";

  useEffect(() => {
    fetchGiveaways().then(setGiveaways);
  }, []);

  const categories = ["all", "dlc"];

  // 🎁 SOLO REWARDS
  const rewards = giveaways.filter(g => g.type === "DLC");

  // 🔥 FILTRO POR CATEGORÍA
  const filteredByCategory =
    filter === "all"
      ? rewards
      : rewards.filter(r =>
          r.type.toLowerCase().includes(filter)
        );

  // 🔍 BÚSQUEDA POR NOMBRE
  const finalRewards = filteredByCategory.filter(reward =>
    reward.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Background />

      <div className="container">
        <h1>🎁 Recompensas</h1>

        {/* TOOLBAR */}
        <div className="games-toolbar">

          {/* SEARCH */}
          <input
            className="search-input"
            type="text"
            placeholder="Buscar recompensas..."
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
          {finalRewards.map(reward => (
            <RewardCard
              key={reward.id}
              item={reward}
              isFavorite={isFavorite(`giveaway-${reward.id}`)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Rewards;