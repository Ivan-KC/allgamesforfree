export default async function handler(req: any, res: any) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Missing id" });
  }

  const url = `https://www.freetogame.com/api/game?id=${id}`;

  const response = await fetch(url);
  const data = await response.json();

  res.setHeader("Access-Control-Allow-Origin", "*");
  return res.status(200).json(data);
}