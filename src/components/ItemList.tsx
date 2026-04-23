import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Background from "./Background";
import { useFavorites } from "../hooks/useFavorites";

import "../styles/grid.css";
import "../styles/search.css";

interface Props<T> {
  title: string;
  fetchFunction: () => Promise<T[]>;
  CardComponent: React.ComponentType<any>;
  categories?: string[];
  favoritePrefix: string;
  filterKey?: string; // 👈 NUEVO
  filterFunction?: (item: T) => boolean;
}

function ItemList<T>({
  title,
  fetchFunction,
  CardComponent,
  categories = ["all"],
  favoritePrefix,
  filterKey = "type",
  filterFunction
}: Props<T>) {

  const [items, setItems] = useState<T[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  const { toggleFavorite, isFavorite } = useFavorites();

  const filter = searchParams.get("filter") || "all";

  useEffect(() => {
  fetchFunction().then(setItems);
    }, [fetchFunction]);

  // filtro base (ej: solo DLC o Early Access)
  let filteredItems = items;

  if (filterFunction) {
    filteredItems = items.filter(filterFunction);
  }

  // filtro por categoría (genre o type)
  const filteredByCategory =
    filter === "all"
      ? filteredItems
      : filteredItems.filter((item: any) =>
          item[filterKey]
            ?.toLowerCase()
            .includes(filter)
        );

  // búsqueda
  const finalItems = filteredByCategory.filter((item: any) =>
    item.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      <Background />

      <div className="container">

        <h1>{title}</h1>

        <div className="games-toolbar">

          <input
            className="search-input"
            type="text"
            placeholder={`Buscar ${title.toLowerCase()}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

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

        <div className="grid">
          {finalItems.map((item: any) => (
            <CardComponent
              key={item.id}
              item={item}
              isFavorite={isFavorite(
                `${favoritePrefix}-${item.id}`
              )}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

export default ItemList;