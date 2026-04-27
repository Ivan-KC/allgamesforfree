import { fetchGiveaways } from "../services/fetchGiveaways";

import ItemList from "../components/ItemList";
import GiveawayCard from "../components/GiveawayCard";

function Giveaways() {

  return (
    <ItemList
      title="Giveaways"
      fetchFunction={fetchGiveaways}
      CardComponent={GiveawayCard}
      categories={[
        { value: "all", label: "Todos" },
        { value: "game", label: "Game" },
        { value: "loot", label: "Loot" },
        { value: "beta", label: "Beta" }
      ]}
      sortOptions={[
        { value: "date", label: "Más recientes" },
        { value: "popularity", label: "Popularidad" },
        { value: "value", label: "Precio y rareza" }
      ]}
      favoritePrefix="giveaway"
    />
  );

}

export default Giveaways;