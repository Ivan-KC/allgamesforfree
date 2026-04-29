import { safeFetch } from "../utils/safeFetch";
import type { Giveaway } from "../types/Giveaway";
import { API } from "../utils/API";

export const fetchGiveawayById = async (id: string): Promise<Giveaway> => {
  const url = `${API.gamerpower}/giveaway?id=${id}`;

  return await safeFetch(url, "fetchGiveawayById");
};