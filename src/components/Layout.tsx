import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./Header";

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

  return (
    <>
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <Outlet />
    </>
  );
}