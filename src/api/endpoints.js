//search books
export function getSearchEndpoint(query, page = 1) {
  return `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&page=${page}`;
}

//books
export function getWorkDetailsEndpoint(workId) {
  return `https://openlibrary.org/works/${workId}.json`;
}
//author
export function getAuthorDetailsEndpoint(authorId) {
  return `https://openlibrary.org/authors/${authorId}.json`;
}

//author photo
export function getAuthorPhotoEndpoint(photoId, size = "L") {
  return `https://covers.openlibrary.org/a/id/${photoId}-${size}.jpg`;
}

//book cover
export function getCoverEndpoint(coverId, size = "L") {
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}

//books home page
export function getFeaturedBooksEndpoint(subject = "fantasy", limit = 8) {
  return `https://openlibrary.org/subjects/${subject}.json?limit=${limit}`;
}

//book genre
export function getBooksByCategoryEndpoint(category, limit = 20, page = 1) {
  return `https://openlibrary.org/subjects/${category}.json?limit=${limit}&offset=${(page - 1) * limit}`;
}

//book details
export function getWorkEditionsEndpoint(workId, limit = 1) {
  return `https://openlibrary.org/works/${workId}/editions.json?limit=${limit}`;
}
