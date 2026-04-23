import ItemList from "../components/ItemList";
import RewardCard from "../components/RewardCard";

import { fetchGiveaways } from "../services/fetchGiveaways";

function Rewards() {

  return (
    <ItemList
      title="🎁 Recompensas"
      fetchFunction={fetchGiveaways}
      filterFunction={(item: any) =>
        item.type === "DLC"
      }
      CardComponent={RewardCard}
      categories={["all", "dlc"]}
      favoritePrefix="giveaway"
    />
  );

}

export default Rewards;