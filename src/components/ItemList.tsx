import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useFavorites } from "../utils/useFavorites";

import "../styles/components/search.css";

type Category =
  | string
  | {
    value: string;
    label: string;
    group?: string;
  };
interface Props<T> {
  title: string;
  fetchFunction: (params: {
    filter?: string;
    sort?: string;
  }) => Promise<T[]>;
  CardComponent: React.ComponentType<any>;
  categories?: Category[];
  favoritePrefix: string;
  filterFunction?: (item: T) => boolean;
  sortOptions?: { value: string; label: string }[];
}

function ItemList<T>({
  title,
  fetchFunction,
  CardComponent,
  categories = [{ value: "all", label: "Todos" }],
  filterFunction,
  sortOptions = [],
  favoritePrefix
}: Props<T>) {

  const [items, setItems] = useState<T[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const normalizedCategories = categories.map(c =>
    typeof c === "string"
      ? { value: c, label: c.toUpperCase() }
      : c
  );
  const mainCategories = normalizedCategories.filter(
    c => !c.group || c.group === "genre"
  );
  const tagCategories = normalizedCategories.filter(
    c => c.group === "tag"
  );

  const { isFavorite, removeFavorite } = useFavorites();

  const filter = searchParams.get("filter") || "all";
  const sort = searchParams.get("sort") || sortOptions[0].value;

  // Filtro base hecho por el Backend
  useEffect(() => {
    let cancelled = false;

    fetchFunction({ filter, sort })
      .then(data => {
        if (!cancelled) {
          setItems(Array.isArray(data) ? data : []);
        }
      })
      .catch(() => {
        if (!cancelled) setItems([]);
      });

    return () => {
      cancelled = true;
    };
  }, [fetchFunction, filter, sort]);

  // Filtro extra opcional (casos especiales)
  let processedItems = Array.isArray(items) ? items : [];

  if (filterFunction) {
    processedItems = items.filter(filterFunction);
  }

  // Búsqueda local
  const finalItems = processedItems.filter((item: any) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  // Helper para no pisar parametros
  const updateParams = (newParams: Record<string, string>) => {
    const current = Object.fromEntries(searchParams.entries());
    setSearchParams({ ...current, ...newParams });
  };

  useEffect(() => {
    if (!processedItems.length) return;

    const elements = document.querySelectorAll(".card");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        entry.target.classList.toggle("in-view", entry.isIntersecting);
      });
    });

    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [processedItems]);

  return (
    <div>
      <div className="container">

        <h1>{title}</h1>

        <div className="games-toolbar">

          {/* Busqueda por nombre */}
          <input
            id="search-input"
            type="text"
            placeholder={`Buscar ${title.toLowerCase()}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Filtros */}
          <div className="filters">
            {mainCategories.map(c => (
              <button
                key={c.value}
                onClick={() => updateParams({ filter: c.value })}
                className={
                  filter === c.value
                    ? "filter-btn active"
                    : "filter-btn"
                }
              >
                {c.label}
              </button>
            ))}
          </div>

          <select
            id="filter-select"
            value={filter}
            onChange={(e) => updateParams({ filter: e.target.value })}
          >
            <option value="">Más filtros...</option>

            <optgroup label="Tags">
              {tagCategories.map(c => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </optgroup>
          </select>

          {/* Orden */}
          <select
            id="sort-select"
            value={sort}
            onChange={(e) =>
              updateParams({ sort: e.target.value })
            }
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

        </div>

        {/* Grid de resultados */}
        <div className="grid">
          {finalItems.map((item: any) => (
            <CardComponent
              key={item.id}
              item={item}
              isFavorite={isFavorite(`${favoritePrefix}-${item.id}`)}
              onToggleFavorite={removeFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ItemList;