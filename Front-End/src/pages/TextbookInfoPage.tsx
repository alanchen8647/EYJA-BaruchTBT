import { useEffect, useState } from "react";
import { getTextbookById, expressInterest} from "../api.jsx";
import {useNavigate, useParams } from "react-router-dom";
import placeholderImage from "../../images/placeholder.jpg";
import {useAuth} from "../context/AuthContext.jsx";
import TextbookImgCarasol from "../components/textbookimgcarasol.jsx";


function TextbookInfoPage() {
  const navigate = useNavigate();
  const user = useAuth().user;
  const {id} = useParams();
  const [book, setBook] = useState(null);
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
      <div className="container my-5">
        <button className="btn btn-link mb-4" onClick={() => navigate(-1)}>
          ← Back
        </button>
      <div className="row justify-content-center mb-5">
        <div className="col-md-6 d-flex justify-content-center">
          {/* <img
            src={book.images_url?.[0] || placeholderImage}
            alt={book.title}
            className="img-fluid"
            style={{ maxHeight: "400px", objectFit: "contain" }}
          /> */}
          <TextbookImgCarasol images={book.images_url}/>
        </div>
      </div>

      <div className="row justify-content-center mb-5">
        <div className="col-md-8">
          <div className="p-4 bg-light">
            <h3 className="mb-3">{book.title}</h3>
            {book.subject && (
              <p className="mb-1">
                <strong>Subject:</strong> {book.subject}
              </p>
            )}
            {book.course_num && (
              <p className="mb-1">
                <strong>Course Number:</strong> {book.course_num}
              </p>
            )}
            {book.condition && (
              <p className="mb-1">
                <strong>Condition:</strong> {book.condition}
              </p>
            )}
            {book.price && (
              <p className="mb-1">
                <strong>Price:</strong> ${book.price}
              </p>
            )}

            {book.description && (
              <>
                <hr />
                <p className="mb-1">
                  <strong>Description:</strong>
                </p>
                <p className="mb-0">{book.description}</p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-2 d-flex justify-content-center mb-3">
          {/* The button sends the user to the chat page to chat about a specific textbook */}
          <button
            className="btn btn-outline-secondary w-100"
            onClick={() => handleExpressInterest()}
          >
            Send Trade Interest
          </button>
        </div>
      </div>
    </div>
  )
  );
}

export default TextbookInfoPage;
