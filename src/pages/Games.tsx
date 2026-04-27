import { fetchGames } from "../services/fetchGames";
import { gameCategories } from "../data/gameCategories";

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