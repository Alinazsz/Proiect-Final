import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout";
import FairyLogoFull from "../assets/FairyLogoFull.svg";
import { useFetch } from "../utils/hooks/useFetch";
import { getFeaturedBooksEndpoint, getCoverEndpoint } from "../api/endpoints";
import "./Home.css";
import { isFavorite, toggleFavorite } from "../utils/favorites";

function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const featuredUrl = getFeaturedBooksEndpoint("fantasy", 8);
  const featuredData = useFetch(featuredUrl);

  function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?query=${query}`);
  }

  const featuredBooks =
    featuredData?.works?.map((work) => ({
      key: work.key,
      title: work.title,
      author: work.authors?.[0]?.name || "Unknown Author",
      cover: work.cover_id
        ? getCoverEndpoint(work.cover_id, "L")
        : "/default-cover.png",
    })) || [];

  return (
    <Layout>
      <section className="hero">
        <img src={FairyLogoFull} alt="Fairy Logo" className="hero-logo" />

        <h1 className="hero-title">Discover Your Next Magical Story</h1>
        <p className="hero-subtitle">
          Explore books, authors, and build your enchanted reading list.
        </p>

        <form className="hero-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" id="searchBtn">
            Search
          </button>
        </form>

        <h2 className="hero-section-title">Featured Books</h2>

        <div className="books-grid">
          {!featuredData && <p>Loading...</p>}

          {featuredBooks.map((book) => {
            const workId = book.key.replace("/works/", "");
            const fav = isFavorite(workId);

            return (
              <div key={book.key} className="book-card-wrapper">
                <button
                  className={`book-heart-btn ${fav ? "active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    toggleFavorite({
                      id: workId,
                      title: book.title,
                      author: book.author,
                      cover: book.cover,
                    });
                    setQuery((q) => q + " "); // force re-render
                  }}
                >
                  {fav ? "❤️" : "♡"}
                </button>

                <Link to={`/books/${workId}`} className="book-card">
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
    </Layout>
  );
}

export default Home;
