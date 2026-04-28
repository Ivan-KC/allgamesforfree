export const fetchGames = async ({
  filter,
  sort,
  platform
}: {
  filter?: string;
  sort?: string;
  platform?: string;
} = {}) => {

  const params = new URLSearchParams();

  if (filter && filter !== "all") {
    params.append("category", filter);
  }

  if (platform && platform !== "all") {
    params.append("platform", platform);
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