export const API = {
  freetogame: import.meta.env.DEV
    ? "/api-freetogame"
    : "https://allgamesforfree.vercel.app/api",

  gamerpower: import.meta.env.DEV
    ? "/api-gamerpower"
    : "https://allgamesforfree.vercel.app/api"
};