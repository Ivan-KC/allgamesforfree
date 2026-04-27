import { useEffect, useState } from "react";

type FavoritesState = {
  collections: Record<string, string[]>;
};

const DEFAULT_COLLECTION = "Favoritos";

export function useFavorites() {
  const [data, setData] = useState<FavoritesState>(() => {
    const stored = localStorage.getItem("favorites");
    return stored
      ? JSON.parse(stored)
      : { collections: { [DEFAULT_COLLECTION]: [] } };
  });

  // Agregar a colección
  const addToCollection = (id: string, collection: string) => {
    let newData: FavoritesState;

    setData(prev => {
      const collections = { ...prev.collections };

      if (!collections[collection]) {
        collections[collection] = [];
      }

      Object.keys(collections).forEach(c => {
        collections[c] = collections[c].filter(f => f !== id);
      });

      collections[collection].push(id);

      newData = { collections };
      return newData;
    });

    setTimeout(() => {
      // Guardar favorito
      localStorage.setItem("favorites", JSON.stringify(newData));

      // Notificar de nuevo favorito
      window.dispatchEvent(new Event("favoritesUpdated"));
    }, 0);
  };

  // Eliminar de todas
  const removeFavorite = (id: string) => {
    let newData: FavoritesState;

    setData(prev => {
      const collections = { ...prev.collections };

      Object.keys(collections).forEach(c => {
        collections[c] = collections[c].filter(f => f !== id);
      });

      newData = { collections };
      return newData;
    });
    
    setTimeout(() => {
      // Sacar favorito
      localStorage.setItem("favorites", JSON.stringify(newData));

      // Notificar borrado del favorito
      window.dispatchEvent(new Event("favoritesUpdated"));
    }, 0);
  };

  const isFavorite = (id: string) => {
    return Object.values(data.collections).some(col =>
      col.includes(id)
    );
  };

  useEffect(() => {
    const handleUpdate = () => {
      const stored = localStorage.getItem("favorites");
      if (stored) {
        setData(JSON.parse(stored));
      }
    };

    window.addEventListener("favoritesUpdated", handleUpdate);

    return () => {
      window.removeEventListener("favoritesUpdated", handleUpdate);
    };
  }, []);

  return {
    collections: data.collections,
    addToCollection,
    removeFavorite,
    isFavorite
  };
}