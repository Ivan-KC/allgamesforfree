import { safeFetch } from "../utils/safeFetch";
import type { Giveaway } from "../types/Giveaway";

export const fetchGiveawayById = async (id: string): Promise<Giveaway> => {
  const url = `/api-gamerpower/giveaway?id=${id}`;

  return await safeFetch(url, "fetchGiveawayById");
};