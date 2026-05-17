import { Link } from "react-router-dom";
import "./BookCard.css";

function BookCard({ book }) {
  const workId = book.key.replace("/works/", "");

  return (
    <Link to={`/books/${workId}`} className="book-card">
      <img src={book.cover} alt={book.title} />
      <h3>{book.title}</h3>
      <p>{book.author}</p>
    </Link>
  );
}

export default BookCard;
