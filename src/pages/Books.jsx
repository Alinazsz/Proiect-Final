import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useFetch } from "../utils/hooks/useFetch";
import { getBooksByCategoryEndpoint, getCoverEndpoint } from "../api/endpoints";
import "./Books.css";
import { Link } from "react-router-dom";
import { isFavorite, toggleFavorite } from "../utils/favorites";

function Books() {
  const [genre, setGenre] = useState("fantasy");
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const url = getBooksByCategoryEndpoint(genre, 20, page);
  const data = useFetch(url);

  const books =
    data?.works?.map((work) => ({
      key: work.key,
      title: work.title,
      author: work.authors?.[0]?.name || "Unknown Author",
      cover: work.cover_id
        ? getCoverEndpoint(work.cover_id, "L")
        : "/default-cover.png",
    })) || [];

  function handleGenreChange(e) {
    setGenre(e.target.value);
    setPage(1);
  }

  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout>
      <section className="books-page enchanted-page">
        <h1 className="books-page-title">Browse Books</h1>
        <p className="books-page-subtitle">
          Choose a genre and explore new stories
        </p>

        <div className="books-page-controls">
          <select
            className="books-page-select"
            value={genre}
            onChange={handleGenreChange}
          >
            <option value="fantasy">Fantasy</option>
            <option value="romance">Romance</option>
            <option value="mystery">Mystery</option>
            <option value="science_fiction">Science Fiction</option>
            <option value="horror">Horror</option>
            <option value="children">Children</option>
            <option value="history">History</option>
            <option value="biography">Biography</option>
          </select>
        </div>

        <div className="books-page-grid">
          {books.map((book) => {
            const workId = book.key.replace("/works/", "");
            const fav = isFavorite(workId);

            return (
              <div key={book.key} className="books-page-card-wrapper">
                <button
                  className={`books-page-heart-btn ${fav ? "active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    toggleFavorite({
                      id: workId,
                      title: book.title,
                      author: book.author,
                      cover: book.cover,
                    });
                    setRefresh((r) => !r);
                  }}
                >
                  {fav ? "❤️" : "♡"}
                </button>

                <Link to={`/books/${workId}`} className="books-page-card">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="books-page-cover"
                  />
                  <h3 className="books-page-title-text">{book.title}</h3>
                  <p className="books-page-author">{book.author}</p>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="books-page-pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </button>

          <span>Page {page}</span>

          <button
            disabled={!data || !data.works || data.works.length < 20}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </section>

      {showScroll && (
        <button
          className="scroll-up-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑
        </button>
      )}
    </Layout>
  );
}

export default Books;
