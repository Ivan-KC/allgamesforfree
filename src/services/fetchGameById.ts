import type { GameDetail } from "../types/GameDetail";
import { safeFetch } from "../utils/safeFetch";
import { API } from "../utils/API";

export const fetchGameById = async (id: string): Promise<GameDetail> => {
  const url = `${API.freetogame}/game?id=${id}`;

  return await safeFetch(url, "fetchGameById");
};