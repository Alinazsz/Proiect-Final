export function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

export function saveFavorites(favs) {
  localStorage.setItem("favorites", JSON.stringify(favs));
}

export function isFavorite(workId) {
  const favs = getFavorites();
  return favs.some((b) => b.id === workId);
}

export function toggleFavorite(book) {
  const favs = getFavorites();
  const exists = favs.some((b) => b.id === book.id);

  let updated;

  if (exists) {
    updated = favs.filter((b) => b.id !== book.id);
  } else {
    updated = [...favs, book];
  }

  saveFavorites(updated);

  // ⭐ Dispatch a global event so the header updates
  window.dispatchEvent(new Event("favorites-updated"));

  return !exists;
}

export function removeFavorite(id) {
  const favs = getFavorites().filter((b) => b.id !== id);
  saveFavorites(favs);
}
