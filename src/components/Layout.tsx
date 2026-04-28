import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFavorites } from "../utils/useFavorites";

import Header from "./Header";
import Background from "./Background";
import Footer from "./Footer";

import "../styles/components/favorite-modal.css";

export default function Layout() {
  const [darkMode, setDarkMode] = useState(() => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Escuchar cambios en el tema del sistema
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches);
    };

    media.addEventListener("change", handleChange);

    return () => {
      media.removeEventListener("change", handleChange);
    };
  }, []);

  // Aplicar tema
  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
  }, [darkMode]);

  const { collections, addToCollection } = useFavorites();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState("");
  const [newCollection, setNewCollection] = useState("");

  const openFavoritesModal = (id: string) => {
    setSelectedId(id);
    setSelectedCollection("Favoritos");
    setNewCollection("");
    setShowModal(true);
  };

  return (
    <>
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <Background />

      <Outlet context={{ openFavoritesModal }} />

      <Footer />

      {showModal && selectedId && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Guardar en una colección</h3>

            <label>Elegir colección</label>
            <select
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.target.value)}
              disabled={newCollection.trim().length > 0}
            >
              {Object.keys(collections).map(name => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>

            <label>Nueva colección</label>
            <input
              type="text"
              placeholder="Ej: RPG favoritos"
              value={newCollection}
              onChange={(e) => setNewCollection(e.target.value)}
            />

            <div className="modal-actions">
              <button
                onClick={() => {
                  const collectionName =
                    newCollection.trim() || selectedCollection;

                  if (!collectionName) return;

                  addToCollection(selectedId, collectionName);

                  setNewCollection("");
                  setSelectedCollection("");
                  setShowModal(false);
                }}
              >
                Guardar
              </button>

              <button onClick={() => setShowModal(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}