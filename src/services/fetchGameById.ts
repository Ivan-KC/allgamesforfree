import type { GameDetail } from "../types/GameDetail";

export const fetchGameById = async (id: string): Promise<GameDetail> => {
  const res = await fetch(`/api-freetogame/game?id=${id}`);

  if (!res.ok) {
    throw new Error("Error al obtener juego");
  }

  return res.json();
};