import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getFavorites, removeFavorite } from "../utils/favorites";
import { Link } from "react-router-dom";
import "./Favorites.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  function handleRemove(book) {
    removeFavorite(book.id);
    setFavorites(getFavorites());
    window.dispatchEvent(new Event("favorites-updated"));
  }

  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout>
      <div className="favorites-page">
        <h1 className="favorites-title">Your Book Shelf</h1>

        {favorites.length === 0 && (
          <div className="favorites-empty">
            <p>No favorite books yet..</p>
            <Link to="/books" className="favorites-empty-btn">
              Browse Books
            </Link>
          </div>
        )}

        <div className="favorites-grid">
          {favorites.map((book) => (
            <div key={book.id} className="favorite-card">
              <img
                src={book.cover}
                alt={book.title}
                className="favorite-card-cover"
              />

              <h3 className="favorite-card-title">{book.title}</h3>
              <p className="favorite-card-author">
                {book.author || "Unknown Author"}
              </p>

              <div className="favorite-card-actions">
                <Link to={`/books/${book.id}`} className="favorite-view-btn">
                  View Details
                </Link>

                <button
                  className="favorite-remove-btn"
                  onClick={() => handleRemove(book)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
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

export default Favorites;
