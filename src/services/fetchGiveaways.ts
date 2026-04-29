import { safeFetch } from "../utils/safeFetch";
import { API } from "../utils/API";

export const fetchGiveaways = async ({
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
    params.append("type", filter);
  }

  if (platform && platform !== "all") {
    params.append("platform", platform);
  }

  if (sort) {
    params.append("sort-by", sort);
  }

  const url = `${API.gamerpower}/giveaways${params.toString() ? `?${params.toString()}` : ""}`;

  const data =  await safeFetch(url, "fetchGiveaways");

  return data.map((item: any) => ({
    ...item,
    source: "giveaway"
  }));
};