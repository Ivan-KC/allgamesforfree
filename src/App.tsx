import { useEffect, useState } from "react";
import type { Game } from "./types/Game";
import type { Giveaway } from "./types/Giveaway";

import GameCard from "./components/GameCard";
import GiveawayCard from "./components/GiveawayCard";
import RewardCard from "./components/RewardCard";
import BetaCard from "./components/BetaCard";
import Header from "./components/Header";

import "./styles/fonts.css"
import "./styles/theme.css";
import "./styles/header.css";
import "./styles/grid.css";
import "./styles/card.css";

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [giveaways, setGiveaways] = useState<Giveaway[]>([]);
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

  useEffect(() => {
    // FreeToGame (Juegos gratis)
    fetch("/api-freetogame/games")
      .then(res => res.json())
      .then(data => {
        console.log("Games:", data);
        setGames(data);
      })
      .catch(err => console.error(err));

    // GamerPower (Regalos)
    fetch("/api-gamerpower/giveaways")
      .then(res => res.json())
      .then(data => {
        console.log("Giveaways:", data);
        setGiveaways(data);
      })
      .catch(err => console.error(err));
  }, []);

  const gamesList = games.slice(0, 8);

  const giveawaysGames = giveaways.filter(g => g.type === "Game").slice(0, 8);
  const rewards = giveaways.filter(g => g.type === "DLC").slice(0, 4);
  const betas = giveaways.filter(g => g.type === "Early Access").slice(0, 4);

  return (
    <div>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="container">
        <h1>🎮 Bienvenido! 🎮</h1>

        <h2>Juegos gratis:</h2>
        <div className="grid">
          {gamesList.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>

        <h2>🆓 Juegos regalandose:</h2>
        <div className="grid">
          {giveawaysGames.map(g => (
            <GiveawayCard key={g.id} giveaway={g} />
          ))}
        </div>

        <h2>🎁 Recompensas gratis en juegos:</h2>
        <div className="grid">
          {rewards.map(g => (
            <RewardCard key={g.id} giveaway={g} />
          ))}
        </div>

        <h2>🧪 Betas gratis:</h2>
        <div className="grid">
          {betas.map(g => (
            <BetaCard key={g.id} giveaway={g} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;