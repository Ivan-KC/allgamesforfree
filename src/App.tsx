import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Contact from "./pages/Contact";
import Games from "./pages/Games";
import Giveaways from "./pages/Giveaways";
import GameDetail from "./pages/GameDetail";
import GiveawayDetail from "./pages/GiveawayDetail";
import History from "./pages/History";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />}>

          <Route index element={<Home />} />

          <Route path="favorites" element={<Favorites />} />

          <Route path="contacto" element={<Contact />} />

          <Route path="games" element={<Games />} />

          <Route path="giveaways" element={<Giveaways />} />

          <Route path="/game/:id" element={<GameDetail />} />

          <Route path="/giveaway/:id" element={<GiveawayDetail />} />

          <Route path="history" element={<History />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;