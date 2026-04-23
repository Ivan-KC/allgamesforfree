import ItemList from "../components/ItemList";
import BetaCard from "../components/BetaCard";

import { fetchGiveaways } from "../services/fetchGiveaways";

function Betas() {

  return (
    <ItemList
      title="🧪 Betas"
      fetchFunction={fetchGiveaways}
      filterFunction={(item: any) =>
        item.type === "Early Access"
      }
      CardComponent={BetaCard}
      categories={["all", "early access"]}
      favoritePrefix="giveaway"
    />
  );

}

export default Betas;