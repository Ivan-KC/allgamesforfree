export const fetchGiveaways = async ({
  filter,
  sort
}: {
  filter?: string;
  sort?: string;
} = {}) => {

  const params = new URLSearchParams();

  if (filter && filter !== "all") {
    params.append("type", filter);
  }

  if (sort) {
    params.append("sort-by", sort);
  }

  const url = `/api-gamerpower/giveaways${
    params.toString() ? `?${params.toString()}` : ""
  }`;

  const res = await fetch(url);
  return res.json();
};