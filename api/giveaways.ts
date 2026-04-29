export default async function handler(req: any, res: any) {
  const url = "https://www.gamerpower.com/api/giveaways";

  const response = await fetch(url);
  const data = await response.json();

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(data);
}