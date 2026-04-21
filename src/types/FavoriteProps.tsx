export type FavoriteProps<T> = {
  item: T;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
};