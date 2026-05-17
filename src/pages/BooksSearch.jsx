import { useLocation, Link } from "react-router-dom";
import { useFetch } from "../utils/hooks/useFetch";
import { getSearchEndpoint, getCoverEndpoint } from "../api/endpoints";
import "../pages/Home.css";
import Layout from "../components/Layout";
import { isFavorite, toggleFavorite } from "../utils/favorites";
import { useState, useEffect } from "react";

function BooksSearch() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("query") || "";

  const url = getSearchEndpoint(searchQuery);
  const data = useFetch(url);

  useEffect(() => {
    if (data) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [data]);

  const results =
    data?.docs?.map((book) => ({
      key: book.key.replace("/works/", ""),
      title: book.title,
      author: book.author_name?.[0] || "Unknown Author",
      cover: book.cover_i
        ? getCoverEndpoint(book.cover_i, "M")
        : "/default-cover.png",
    })) || [];

  const [showScroll, setShowScroll] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout>
      <section className="search-page">
        <h1 className="search-title">Search Results for "{searchQuery}"</h1>

        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-link">
            Home
          </Link>
          <span className="breadcrumb-separator">→</span>
          <span className="breadcrumb-current">Search</span>
        </nav>

        {!data && <p>Loading...</p>}

        <div className="books-grid">
          {results.map((book) => {
            const fav = isFavorite(book.key);

            return (
              <div className="book-card-wrapper" key={book.key}>
                <button
                  className={`book-heart-btn ${fav ? "active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    toggleFavorite({
                      id: book.key,
                      title: book.title,
                      author: book.author,
                      cover: book.cover,
                    });
                    setRefresh((r) => !r); // force re-render
                  }}
                >
                  {fav ? "❤️" : "♡"}
                </button>

                <Link
                  to={`/books/${book.key}`}
                  className="book-card book-card-link"
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="book-cover"
                  />
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">{book.author}</p>
                </Link>
              </div>
            );
          })}
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

export default BooksSearch;
