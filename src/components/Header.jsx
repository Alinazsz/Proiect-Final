import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import FairyLogoFull from "../assets/FairyLogoFull.svg";
import { getFavorites } from "../utils/favorites";

function Header() {
  const [open, setOpen] = useState(false);
  const [favCount, setFavCount] = useState(0);

  // 🌙 Dark mode state
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  // 🌙 Apply dark mode to <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // ❤️ Favorites counter
  useEffect(() => {
    function updateCount() {
      setFavCount(getFavorites().length);
    }

    updateCount();
    window.addEventListener("favorites-updated", updateCount);

    return () => {
      window.removeEventListener("favorites-updated", updateCount);
    };
  }, []);

  return (
    <header className="header">
      <div className="header-ribbon"></div>
      <div className="header-fireflies"></div>

      <div className="header-inner">
        <Link to="/" className="header-brand">
          <img src={FairyLogoFull} alt="Fairy Logo" className="header-logo" />
          <span className="header-title header-title-storybook">
            Enchanted Library
          </span>
        </Link>

        <button className="header-menu-toggle" onClick={() => setOpen(!open)}>
          ☰
        </button>

        <nav className={`header-nav ${open ? "header-nav-open" : ""}`}>
          <Link to="/books" className="nav-item">
            <span className="nav-item-icon">🕮</span>
          </Link>

          <Link to="/authors" className="nav-item">
            <span className="nav-item-icon">𐀪</span>
          </Link>

          <Link to="/favorites" className="nav-heart">
            <span className="nav-heart-icon">♡</span>
            {favCount > 0 && (
              <span className="nav-heart-count">{favCount}</span>
            )}
          </Link>

          {/* 🌙 Dark mode toggle */}
          <button
            className="header-theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            <span className="nav-dark-icon">{darkMode ? "☽" : "☼"}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
