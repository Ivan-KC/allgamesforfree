export const fetchGiveaways = async () => {
  const res = await fetch("/api-gamerpower/giveaways");
  return res.json();
};