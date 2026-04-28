import type { GameDetail } from "../types/GameDetail";
import { safeFetch } from "../utils/safeFetch";

export const fetchGameById = async (id: string): Promise<GameDetail> => {
  const url = `/api-freetogame/game?id=${id}`;

  return await safeFetch(url, "fetchGameById");
};