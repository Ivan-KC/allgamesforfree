import type { Giveaway } from "../types/Giveaway";

export const fetchGiveawayById = async (id: string): Promise<Giveaway> => {
  const res = await fetch(`/api-gamerpower/giveaway?id=${id}`);

  if (!res.ok) {
    throw new Error("Error al obtener giveaway");
  }

  return res.json();
};