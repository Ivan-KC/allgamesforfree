import ItemList from "../components/ItemList";
import GiveawayCard from "../components/GiveawayCard";

import { fetchGiveaways } from "../services/fetchGiveaways";

function Giveaways() {

  return (
    <ItemList
      title="🎁 Giveaways"
      fetchFunction={fetchGiveaways}
      CardComponent={GiveawayCard}
      categories={["all", "game", "dlc", "early access"]}
      favoritePrefix="giveaway"
    />
  );

}

export default Giveaways;