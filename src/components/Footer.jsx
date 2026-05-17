import "./Footer.css";
import { Link } from "react-router-dom";
import FairyLogoFull from "../assets/FairyLogoFull.svg";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src={FairyLogoFull} alt="Fairy Logo" className="footer-logo" />
          <span className="footer-title">Enchanted Library</span>
        </div>

        <p className="footer-subtitle">
          © {year} Enchanted Library — Crafted with magic ✨
        </p>
      </div>

      {/* Magical sparkles */}
      <div className="footer-sparkles"></div>
    </footer>
  );
}

export default Footer;
