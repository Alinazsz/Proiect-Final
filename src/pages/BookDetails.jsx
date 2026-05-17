import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import {
  getWorkDetailsEndpoint,
  getWorkEditionsEndpoint,
  getAuthorDetailsEndpoint,
  getCoverEndpoint,
} from "../api/endpoints";
import "./BookDetails.css";
import { isFavorite, toggleFavorite } from "../utils/favorites";

function BookDetails() {
  const { workId } = useParams();

  const [book, setBook] = useState(null);
  const [edition, setEdition] = useState(null);
  const [author, setAuthor] = useState(null);

  // ⭐ Favorites state INSIDE the component
  const [favorite, setFavorite] = useState(false);

  // ⭐ Set initial favorite state when book loads
  useEffect(() => {
    if (book) {
      setFavorite(isFavorite(workId));
    }
  }, [book, workId]);

  // ⭐ Fetch book, author, edition
  useEffect(() => {
    async function fetchBook() {
      try {
        const workRes = await fetch(getWorkDetailsEndpoint(workId));
        const workJson = await workRes.json();
        setBook(workJson);

        if (workJson?.authors?.[0]?.author?.key) {
          const authorId = workJson.authors[0].author.key.replace(
            "/authors/",
            "",
          );
          const authorRes = await fetch(getAuthorDetailsEndpoint(authorId));
          const authorJson = await authorRes.json();
          setAuthor(authorJson);
        }

        const editionRes = await fetch(getWorkEditionsEndpoint(workId));
        const editionJson = await editionRes.json();
        if (editionJson?.entries?.length > 0) {
          setEdition(editionJson.entries[0]);
        }
      } catch (err) {
        console.error("Error loading book details:", err);
      }
    }

    fetchBook();
  }, [workId]);

  if (!book) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  const coverId = book.covers?.[0] || edition?.covers?.[0] || null;
  const coverUrl = coverId
    ? getCoverEndpoint(coverId, "L")
    : "/default-book.png";

  return (
    <Layout>
      <section className="book-details-page enchanted-page">
        <div className="book-details-container">
          <img src={coverUrl} alt={book.title} className="book-details-cover" />

          <div className="book-details-info">
            <h1 className="book-details-title">{book.title}</h1>

            {author && (
              <p className="book-details-author">
                by <strong>{author.name}</strong>
              </p>
            )}

            <p className="book-details-description">
              {book.description?.value ||
                book.description ||
                "No description available."}
            </p>

            <div className="book-details-meta">
              <p>
                <strong>Pages:</strong> {edition?.number_of_pages || "Unknown"}
              </p>
              <p>
                <strong>Published:</strong> {edition?.publish_date || "Unknown"}
              </p>
              <p>
                <strong>Publisher:</strong>{" "}
                {edition?.publishers?.[0] || "Unknown"}
              </p>
            </div>

            <div className="book-details-buttons">
              <button
                className="book-details-back-button"
                onClick={() => window.history.back()}
              >
                ← Back to Books
              </button>

              <button
                className={`book-details-favorite-button ${favorite ? "active" : ""}`}
                onClick={() => {
                  const newState = toggleFavorite({
                    id: workId,
                    title: book.title,
                    author: author?.name || "Unknown Author",
                    cover: coverUrl,
                  });
                  setFavorite(newState);
                }}
              >
                {favorite ? "❤︎ Added to Favorites" : "♡ Add to Favorites"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default BookDetails;
