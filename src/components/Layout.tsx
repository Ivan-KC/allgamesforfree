import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./Header";

export default function Layout() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
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