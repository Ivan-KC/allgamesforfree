import { useEffect, useState } from "react";

export function useFavorites() {
    // Cargar
    const [favorites, setFavorites] = useState<string[]>(() => {
        const stored = localStorage.getItem("favorites");
        return stored ? JSON.parse(stored) : [];
    });

    // Guardar
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    // Toggle de los corazones
    const toggleFavorite = (id: string) => {
        console.log("TOGGLE:", id);

        setFavorites(prev => {
            const updated = prev.includes(id)
                ? prev.filter(f => f !== id)
                : [...prev, id];

            console.log("NEW FAVORITES:", updated);
            return updated;
        });
    };

    // Chequeo de favorito
    const isFavorite = (id: string) => {
        return favorites.includes(id);
    };

    return { favorites, toggleFavorite, isFavorite };
}