import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Favorites from "./pages/Fav";
import Contacto from "./pages/Contacto";
import Games from "./pages/Games";
import Betas from "./pages/Betas";
import Rewards from "./pages/Rewards";
import Giveaways from "./pages/Giveaways";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />}>

          <Route index element={<Home />} />

          <Route path="favorites" element={<Favorites />} />

          <Route path="contacto" element={<Contacto />} />

          <Route path="games" element={<Games />} />

          <Route path="betas" element={<Betas />} />

          <Route path="rewards" element={<Rewards />} />

          <Route path="giveaways" element={<Giveaways />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;