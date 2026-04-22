import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Favorites from "./pages/Fav";
import Contacto from "./pages/Contacto";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />}>

          <Route index element={<Home />} />

          <Route path="favorites" element={<Favorites />} />

          <Route path="contacto" element={<Contacto />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;