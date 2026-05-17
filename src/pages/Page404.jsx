import React from "react";
import "./Page404.css";
import { Link } from "react-router-dom";

function Page404() {
  return (
    <section className="page404-page enchanted-page">
      <div className="page404-container">
        <p className="page404-subtitle">
          Oh no… you’ve wandered off the enchanted path.
        </p>

        <h1 className="page404-code">404</h1>

        <p className="page404-subtitle">
          The page you’re looking for has drifted into another realm.
        </p>

        <Link to="/" className="page404-button">
          ← Back to the Library
        </Link>
      </div>
    </section>
  );
}

export default Page404;
