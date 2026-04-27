export const fetchGames = async ({
  filter,
  sort
}: {
  filter?: string;
  sort?: string;
} = {}) => {

  const params = new URLSearchParams();

  if (filter && filter !== "all") {
    params.append("category", filter);
  }

  if (sort) {
    params.append("sort-by", sort);
  }

  const url = `/api-freetogame/games${
    params.toString() ? `?${params.toString()}` : ""
  }`;

  const res = await fetch(url);
  return res.json();
};