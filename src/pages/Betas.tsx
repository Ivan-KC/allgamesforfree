import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import type { Giveaway } from "../types/Giveaway";
import { fetchGiveaways } from "../services/fetchGiveaways";

import { useFavorites } from "../hooks/useFavorites";

import BetaCard from "../components/BetaCard";
import Background from "../components/Background";

import "../styles/grid.css";
import "../styles/card.css";
import "../styles/search.css";

function Betas() {
  const [giveaways, setGiveaways] = useState<Giveaway[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  const { toggleFavorite, isFavorite } = useFavorites();

  const filter = searchParams.get("filter") || "all";

  useEffect(() => {
    fetchGiveaways().then(setGiveaways);
  }, []);

  const categories = ["all", "early access"];

  // 🔥 SOLO BETAS
  const betas = giveaways.filter(g => g.type === "Early Access");

  // 🔥 FILTRO (por categoría si querés extenderlo)
  const filteredByCategory =
    filter === "all"
      ? betas
      : betas.filter(g =>
          g.type.toLowerCase().includes(filter)
        );

  // 🔥 BÚSQUEDA POR NOMBRE
  const finalBetas = filteredByCategory.filter(beta =>
    beta.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Background />

      <div className="container">
        <h1>🧪 Betas</h1>

        {/* TOOLBAR */}
        <div className="games-toolbar">

          {/* SEARCH */}
          <input
            className="search-input"
            type="text"
            placeholder="Buscar betas..."
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
          {finalBetas.map(beta => (
            <BetaCard
              key={beta.id}
              item={beta}
              isFavorite={isFavorite(`giveaway-${beta.id}`)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Betas;