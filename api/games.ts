export default async function handler(req: any, res: any) {
  const query = req.url.split("?")[1] || "";

  const url = `https://www.gamerpower.com/api/giveaways${
    query ? `?${query}` : ""
  }`;

  const response = await fetch(url);
  const data = await response.json();

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(data);
}