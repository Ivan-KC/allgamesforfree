import { useEffect, useState } from "react";

type FavoritesState = {
  collections: Record<string, string[]>;
};

const DEFAULT_COLLECTION = "Favoritos";

const safeParse = (value: string | null): FavoritesState => {
  try {
    const parsed = value ? JSON.parse(value) : null;

    if (!parsed?.collections || typeof parsed.collections !== "object") {
      return { collections: { [DEFAULT_COLLECTION]: [] } };
    }

    return parsed;
  } catch {
    return { collections: { [DEFAULT_COLLECTION]: [] } };
  }
};

export function useFavorites() {
  const [data, setData] = useState<FavoritesState>(() => {
    return safeParse(localStorage.getItem("favorites"));
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

  // Alternar favorito
  const toggleFavorite = (id: string) => {
    if (isFavorite(id)) {
      removeFavorite(id);
    } else {
      addToCollection(id, DEFAULT_COLLECTION);
    }
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

  const clearCollection = (collectionName: string) => {
    let newData: FavoritesState;

    setData(prev => {
      const collections = { ...prev.collections };

      if (collections[collectionName]) {
        collections[collectionName] = [];
      }

      newData = { collections };
      return newData;
    });

    setTimeout(() => {
      localStorage.setItem("favorites", JSON.stringify(newData));
      window.dispatchEvent(new Event("favoritesUpdated"));
    }, 0);
  };

  const deleteCollection = (collectionName: string) => {
    if (collectionName === DEFAULT_COLLECTION) return;

    let newData: FavoritesState;

    setData(prev => {
      const collections = { ...prev.collections };

      delete collections[collectionName];

      newData = { collections };
      return newData;
    });

    setTimeout(() => {
      localStorage.setItem("favorites", JSON.stringify(newData));
      window.dispatchEvent(new Event("favoritesUpdated"));
    }, 0);
  };

  return {
    collections: data.collections,
    addToCollection,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    clearCollection,
    deleteCollection
  };
}