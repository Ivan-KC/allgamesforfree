import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Aquí se renderizan las páginas */}
      <Outlet />
    </div>
  );
}