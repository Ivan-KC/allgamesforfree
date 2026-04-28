import { fetchGiveaways } from "../services/fetchGiveaways";
import { giveawayPlatforms } from "../utils/giveawayPlatforms";

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
        { value: "game", label: "Juegos" },
        { value: "loot", label: "Recompensas" },
        { value: "beta", label: "Betas" }
      ]}
      platforms={giveawayPlatforms}
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