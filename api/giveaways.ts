export default async function handler(req: any, res: any) {
  const { category, platform, "sort-by": sortBy } = req.query;

  const params = new URLSearchParams();

  if (category) params.append("type", category);
  if (platform) params.append("platform", platform);
  if (sortBy) params.append("sort-by", sortBy);

  const url = `https://www.gamerpower.com/api/giveaways${
    params.toString() ? `?${params.toString()}` : ""
  }`;

  const response = await fetch(url);
  const data = await response.json();

  res.setHeader("Access-Control-Allow-Origin", "*");
  return res.status(200).json(data);
}