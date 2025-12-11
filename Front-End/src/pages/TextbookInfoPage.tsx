import { useEffect, useState } from "react";
import { getTextbookById, expressInterest } from "../api.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import TextbookImgCarasol from "../components/textbookimgcarasol.jsx";

interface Textbook {
  id: string;
  title: string;
  subject?: string;
  course_num?: string;
  condition?: string;
  price?: number; // Assuming price is a number, adjust if it's a string
  description?: string;
  images_url?: string[];
  seller_id: string;
  author?: string;
  // Add any other properties that 'book' might have and are used
}

function TextbookInfoPage() {
  const navigate = useNavigate();
  const user = useAuth().user;
  const { id } = useParams();
  const [book, setBook] = useState<Textbook | null>(null);
  const [loading, setLoading] = useState(true);

  //Fetches textbook details based on the ID from the URL parameters.
  //Populates the textbook info page with the relevant information.
  //If no textbook is found, it shows a message and a button to go back home.
  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (id) {
          const data = await getTextbookById(id);
          setBook(data.textbook);
        }
      } catch (error) {
        console.error("Error fetching textbook details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  console.log("Book details:", book);

  const handleExpressInterest = async () => {
    if (!user) {
      alert("Please log in to express interest in trading.");
      navigate("/login");
      return;
    }
    try {
      if (book) {
        const response = await expressInterest(user.id, book.seller_id, book.id);
        if (response.success) {
          alert("Trade interest expressed successfully!");
        } else {
          alert("Failed to express trade interest.");
        }
      }

    } catch (error) {
      console.error("Error expressing interest:", error);
      alert("An error occurred while expressing interest.");
    }
  };

  //If no textbook is selected, show a message and a button to go back home.
  if (book === null) {
    //A failsafe in case the user does not click on a textbook card to get to this page.
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

  //Renders the textbook info page with all the details and options.
  //Todo: Carousel for multiple images.
  return (
    loading ? (
      <div className="container my-5">
        <p>Loading...</p>
      </div>
    ) : (
      <div className="container mt-3 mb-5">
        <button
          className="btn btn-outline-secondary mb-3 d-flex align-items-center gap-2 rounded-pill px-4"
          onClick={() => navigate(-1)}
          style={{ width: 'fit-content', fontWeight: '500' }}
        >
          <i className="bi bi-arrow-left"></i> Back to Marketplace
        </button>

        <div className="row g-5">
          {/* Left Column: Images (Narrower) */}
          <div className="col-md-5">
            <div className="card shadow-sm border-0 overflow-hidden">
              <TextbookImgCarasol images={book.images_url} />
            </div>
          </div>

          {/* Right Column: Info (Wider) */}
          <div className="col-md-7">
            <div>
              <h1 className="display-5 fw-bold mb-2 text-primary">{book.title}</h1>
              <p className="lead text-muted mb-4">{book.author || "Unknown Author"}</p>

              {/* Info Box - Plain background, no hover animation */}
              <div className="bg-light p-4 mb-4 rounded border-0">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="h3 mb-0 text-primary fw-bold">${book.price}</span>
                  <span className="badge bg-warning text-dark fs-6">{book.condition || "Used"}</span>
                </div>

                <div className="mb-3">
                  <strong>Course:</strong> {book.subject} {book.course_num}
                </div>
              </div>

              <div className="mb-4">
                <h5 className="fw-bold mb-2">Description</h5>
                <p className="text-muted" style={{ lineHeight: '1.8' }}>
                  {book.description || "No description provided."}
                </p>
              </div>

              <div className="d-grid gap-2">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => handleExpressInterest()}
                >
                  Send Trade Interest
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default TextbookInfoPage;
