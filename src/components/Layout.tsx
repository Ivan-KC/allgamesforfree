import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : "light"}>
      
      <Header 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
      />

      <Outlet />

    </div>
  );
}