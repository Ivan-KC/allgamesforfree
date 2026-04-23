import ItemList from "../components/ItemList";
import GameCard from "../components/GameCard";

import { fetchGames } from "../services/fetchGames";

function Games() {

  return (
    <ItemList
      title="🎮 Juegos"
      fetchFunction={fetchGames}
      CardComponent={GameCard}
      categories={[
        "all",
        "shooter",
        "rpg",
        "strategy",
        "action"
      ]}
      favoritePrefix="game"
      filterKey="genre" // ⭐ CLAVE
    />
  );

}

export default Games;