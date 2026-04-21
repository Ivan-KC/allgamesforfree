export type Giveaway = {
  id: number;
  title: string;
  worth: string;
  thumbnail: string;
  image: string;
  description: string;
  instructions: string;
  open_giveaway_url: string;
  published_date: string;
  type: "Game" | "DLC" | "Early Access";
  platforms: string;
  end_date: string;
  users: string;
  status: string;
};