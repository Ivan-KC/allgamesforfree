const HISTORY_KEY = "history";

export type HistoryItem = {
  id: number;
  type: "game" | "giveaway";
  title: string;
  image: string;
};

export function getHistory(): HistoryItem[] {
  const data = localStorage.getItem(HISTORY_KEY);
  return data ? JSON.parse(data) : [];
}

export function addToHistory(item: HistoryItem) {
  const current = getHistory();

  // Eliminar si ya existe
  const filtered = current.filter(
    h => !(h.id === item.id && h.type === item.type)
  );

  // Agregar al principio
  const updated = [item, ...filtered];

  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}