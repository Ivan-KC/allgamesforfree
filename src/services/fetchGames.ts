export const fetchGames = async () => {
  const res = await fetch("/api-freetogame/games");
  return res.json();
};