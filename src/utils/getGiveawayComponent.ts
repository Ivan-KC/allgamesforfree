import GiveawayCard from "../components/GiveawayCard";
import RewardCard from "../components/RewardCard";
import BetaCard from "../components/BetaCard";

export const getGiveawayComponent = (item: any) => {
  switch (item.type?.toLowerCase()) {
    case "game":
      return GiveawayCard;

    case "dlc":
      return RewardCard;

    case "early access":
      return BetaCard;

    default:
      return GiveawayCard;
  }
};