import { fetchGames } from "../services/fetchGames";
import { gameCategories } from "../utils/gameCategories";

import ItemList from "../components/ItemList";
import GameCard from "../components/GameCard";

function Games() {

  return (
    <ItemList
      title="Juegos"
      fetchFunction={fetchGames}
      CardComponent={GameCard}
      categories={[
        { value: "all", label: "Todos" },
        ...gameCategories]}
      platforms={[ 
        { value: "pc", label: "Windows" },
        { value: "browser", label: "Browser" }
      ]}
      sortOptions={[
        { value: "relevance", label: "Relevancia" },
        { value: "popularity", label: "Popularidad" },
        { value: "release-date", label: "Más recientes" },
        { value: "alphabetical", label: "Orden alfabético" }
      ]}
      favoritePrefix="game"
    />
  );

}

export default Games;