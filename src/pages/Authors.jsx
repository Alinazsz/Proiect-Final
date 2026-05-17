import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { POPULAR_AUTHORS } from "../data/authorsList.js";
import {
  getAuthorDetailsEndpoint,
  getAuthorPhotoEndpoint,
} from "../api/endpoints";
import "./Authors.css";
import defaultAuthor from "../assets/default-author.png";

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [showScroll, setShowScroll] = useState(false);

  // Pagination state
  const [page, setPage] = useState(1);
  const authorsPerPage = 10;

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // Pagination slice
  const start = (page - 1) * authorsPerPage;
  const end = start + authorsPerPage;
  const paginatedAuthors = authors.slice(start, end);

  useEffect(() => {
    async function fetchAuthors() {
      const results = [];

      for (const id of POPULAR_AUTHORS) {
        try {
          const res = await fetch(getAuthorDetailsEndpoint(id));
          const json = await res.json();

          // Skip authors with no valid name
          if (!json.name || json.name.trim().length < 3) {
            continue;
          }

          results.push({
            id,
            name: json.name,
            bio: json.bio?.value || json.bio || "No biography available.",
            photo: json.photos?.[0]
              ? getAuthorPhotoEndpoint(json.photos[0])
              : defaultAuthor,
          });
        } catch (err) {
          console.error("Error fetching author:", id);
        }
      }

      setAuthors(results);
    }

    fetchAuthors();
  }, []);

  // Scroll-up button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout>
      <section className="authors-page enchanted-page">
        <h1 className="authors-page-title">Browse Authors</h1>
        <p className="authors-page-subtitle">
          Discover the minds behind your favorite stories
        </p>

        <div className="authors-page-grid">
          {paginatedAuthors.map((author) => (
            <div key={author.id} className="authors-page-card">
              <img
                src={author.photo}
                alt={author.name}
                className="authors-page-photo"
              />
              <h3 className="authors-page-name">{author.name}</h3>
              <p className="authors-page-bio">{author.bio}</p>
            </div>
          ))}
        </div>

        <div className="authors-page-pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </button>

          <span>Page {page}</span>

          <button
            disabled={end >= authors.length}
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

export default Authors;
