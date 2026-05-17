import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import { useFetch } from "../utils/hooks/useFetch";
import { getBooksByCategoryEndpoint } from "../api/endpoints";

function BooksCategory() {
  const { categoryName } = useParams();

  const bookCategoryEndpoint = getBooksByCategoryEndpoint(categoryName, 20, 1);
  const books = useFetch(bookCategoryEndpoint);

  return (
    <Layout>
      <section className="books-category py-5">
        <Container>
          <h1 className="mb-4 text-capitalize">{categoryName} Books</h1>

          {!books && <p>Loading books...</p>}

          {books && (
            <div className="row g-4">
              {books.works?.map((book) => (
                <div key={book.key} className="col-6 col-md-3">
                  <div className="card shadow-sm h-100 p-3">
                    <h6 className="fw-bold">{book.title}</h6>
                    <p className="text-muted small">
                      {book.authors?.[0]?.name || "Unknown Author"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </Layout>
  );
}

export default BooksCategory;
