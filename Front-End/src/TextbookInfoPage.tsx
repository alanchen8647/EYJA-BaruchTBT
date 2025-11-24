import "./App.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";

interface TextbookInfoPageProps {
  addToCart: (book: {
    title: string;
    subject: string;
    course: string;
    condition: string;
    price: string;
    image: string;
    contact: string;
  }) => void;
}

function TextbookInfoPage({ addToCart }: TextbookInfoPageProps) {
  const location = useLocation();
  const navigate = useNavigate();

  // We expect navigation like: <Link to="/TextbookInfo" state={{ book }} />
  const { book } = (location.state as any) || {};

  if (!book) {
    // Fallback if user comes here directly
    return (
      <div className="container my-5">
        <p>No textbook selected.</p>
        <button
          className="btn btn-secondary mt-3"
          onClick={() => navigate("/")}
        >
          Back to home
        </button>
      </div>
    );
  }

  return (
    <div className="container my-5">
      {/* Back button */}
      <button className="btn btn-link mb-4" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* Big textbook image */}
      <div className="row justify-content-center mb-5">
        <div className="col-md-6 d-flex justify-content-center">
          <img
            src={book.image}
            alt={book.title}
            className="img-fluid"
            style={{ maxHeight: "400px", objectFit: "contain" }}
          />
        </div>
      </div>

      {/* Textbook information box */}
      <div className="row justify-content-center mb-5">
        <div className="col-md-8">
          <div className="p-4 bg-light">
            <h3 className="mb-3">{book.title}</h3>
            {book.subject && (
              <p className="mb-1">
                <strong>Subject:</strong> {book.subject}
              </p>
            )}
            {book.course && (
              <p className="mb-1">
                <strong>Course Number:</strong> {book.course}
              </p>
            )}
            {book.condition && (
              <p className="mb-1">
                <strong>Condition:</strong> {book.condition}
              </p>
            )}
            {book.price && (
              <p className="mb-1">
                <strong>Price:</strong> {book.price}
              </p>
            )}
            {book.contact && (
              <p className="mb-0">
                <strong>Seller contact:</strong> {book.contact}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom buttons row */}
      <div className="row justify-content-center">
        <div className="col-md-2 d-flex justify-content-center mb-3">
          <button className="btn btn-outline-secondary w-100">
            More questions
          </button>
        </div>
        <div className="col-md-2 d-flex justify-content-center mb-3">
          <button
            className="btn btn-primary w-100"
            onClick={() => addToCart(book)}
          >
            Add to cart
          </button>
        </div>
        <div className="col-md-2 d-flex justify-content-center mb-3">
          <button className="btn btn-outline-secondary w-100">
            Exchange page
          </button>
        </div>
      </div>
    </div>
  );
}

export default TextbookInfoPage;
