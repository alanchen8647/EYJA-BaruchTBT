import React, { useState } from "react";
import "./App.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import CartPage from "./CartPage.tsx";
import SellPage from "./SellPage.tsx";
import DiscussionPage from "./DiscussionPage.tsx";
import TextbookInfoPage from "./TextbookInfoPage.tsx";
import CommentPage from "./CommentPage.tsx";
import ChatPage from "./ChatPage.tsx";
import LoginPage from "./LoginPage.tsx";
import Textbooks1 from "../images/textbooks1.jpg";
import Mathtextbook from "../images/math-textbook.jpg";

type Textbook = {
  title: string;
  subject: string;
  course: string;
  condition: string;
  price: string;
  image: string;
  contact: string;
  description: string;
};

type CommentsByPost = {
  [title: string]: string[];
};

type TextbookSearchProps = {
  textbooks: Textbook[];
};

//Allows users to search for a specific textbook with the help of a dynamic 
//list that changes the closer the user is to a textbook's name.
function TextbookSearch({ textbooks }: TextbookSearchProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const trimmedQuery = query.trim().toLowerCase();

  const matchingTextbooks =
    trimmedQuery.length === 0
      ? []
      : textbooks.filter((book) =>
          book.title.toLowerCase().includes(trimmedQuery)
        );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!trimmedQuery) return;

    const match = matchingTextbooks[0];
    if (!match) return;

    navigate("/TextbookInfo", { state: { book: match } });
  };

  const handleSuggestionClick = (book: Textbook) => {
    navigate("/TextbookInfo", { state: { book } });
  };

  return (
    <div className="position-relative">
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Enter title or author"
          aria-label="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-outline-primary" type="submit">
          Search
        </button>
      </form>

      {/* This code makes a list of suggestions depending on the characters that the user has typed. */}
      {matchingTextbooks.length > 0 && (
        <div
          className="list-group position-absolute mt-1"
          style={{ zIndex: 1000, width: "100%" }}
        >
          {matchingTextbooks.slice(0, 5).map((book, index) => (
            <button
              type="button"
              key={index}
              className="list-group-item list-group-item-action"
              onClick={() => handleSuggestionClick(book)}
            >
              {book.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  const [textbooks, setTextbooks] = useState<Textbook[]>([]);
  const [cartItems, setCartItems] = useState<Textbook[]>([]);

  const [commentsByPost, setCommentsByPost] = useState<CommentsByPost>({
    "Best textbook for studying art history?": [
      `I love seeing a person getting interested in art history! A good textbook that I 
recommend is "Gardner's Art Through the Ages by Helen Gardner". This book does a great 
job at describing different art forms and eras of art throughout history.`,
      `I hear that "Art: A Brief History by Marilyn Stokstad" is a pretty good textbook for 
getting a rough idea of art throughout history. You can probably find it on this site at 
a decent price.`,
    ],
  });

  //Lets users add textbooks to the cart.
  const addTextbook = (newBook: Textbook) => {
    setTextbooks((prev) => [...prev, newBook]);
  };

  //Prevents users from adding the same textbook to the cart.
  const addToCart = (book: Textbook) => {
    setCartItems((prev) => {
      const alreadyInCart = prev.some((item) => item.title === book.title);
      if (alreadyInCart) {
        return prev;
      }
      return [...prev, book];
    });
  };

  //Turns the price string with an actual number/value.
  const parsePrice = (price: string): number => {
    const numeric = parseFloat(price.replace(/[^0-9.]/g, ""));
    return isNaN(numeric) ? 0 : numeric;
  };

  //Calculates the total price the user must pay with all textbooks considered.
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + parsePrice(item.price),
    0
  );

  const clearCart = () => {
    setCartItems([]);
  };

  //Lets users add comments in the Comment page under a specific discussion.
  const addComment = (postTitle: string, comment: string) => {
    setCommentsByPost((prev) => ({
      ...prev,
      [postTitle]: [...(prev[postTitle] || []), comment],
    }));
  };

  //Dummy textbook card used to show what the textbook cards look like.
  const staticTextbook: Textbook = {
    title: "Calculus by Ron Larson and Bruce Edwards",
    subject: "Math",
    course: "MTH 2003",
    condition: "Used",
    price: "$60.00",
    image: Mathtextbook,
    contact: "",
    description:
      "This book is a good refresher for important calculus concepts for a beginner-intermediate course. I mostly used the textbook for practice problems, so I barely touched it. The condition is used, but the actual condition is near pristine.",
  };

  const allTextbooks: Textbook[] = [staticTextbook, ...textbooks];

  return (
    <BrowserRouter>
      <header>
        <nav className="navbar navbar-expand-lg bg-body-tertiary bg-primary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Baruch TBT
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/Cart"
                  >
                    Cart
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link active" to="/sell">
                    Sell
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link active" to="/Discussion">
                    Discussion/Community
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link active" to="/Chat">
                    Chat
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link active" to="/Login">
                    Login
                  </Link>
                </li>
              </ul>

              <TextbookSearch textbooks={allTextbooks} />
            </div>
          </div>
        </nav>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* Dummy textbook card*/}
              <div className="container my-5">
                <img
                  src={Textbooks1}
                  className="img-fluid"
                  alt="Pile of textbooks"
                  style={{ height: "500px" }}
                />
              </div>

              <div className="container">
                <div className="row g-4">
                  <div className="col-md-3 mb-4">
                    <div className="card" style={{ width: "18rem" }}>
                      <img
                        src={Mathtextbook}
                        className="card-img-top"
                        alt="A calculus textbook"
                      />
                      <div className="card-body">
                        <h5 className="card-title">
                          Calculus by Ron Larson and Bruce Edwards
                        </h5>
                        <p className="card-text" style={{ fontSize: "19px" }}>
                          Course Number: MTH 2003
                        </p>
                        <p className="card-text" style={{ fontSize: "19px" }}>
                          Condition: Used
                        </p>
                        <p className="card-text" style={{ fontSize: "19px" }}>
                          Price: $60.00
                        </p>
                        <div>
                          <Link
                            to="/TextbookInfo"
                            state={{ book: staticTextbook }}
                            className="btn btn-primary mb-3"
                          >
                            More information
                          </Link>
                        </div>
                        <div>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => addToCart(staticTextbook)}
                          >
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*Textbook cards that are added by the user to the home page.*/}
                  {textbooks.map((book, index) => (
                    <div className="col-md-3 mb-4" key={index}>
                      <div className="card" style={{ width: "18rem" }}>
                        <img
                          src={book.image}
                          className="card-img-top"
                          alt={book.title}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{book.title}</h5>
                          <p className="card-text" style={{ fontSize: "19px" }}>
                            Course Number: {book.course}
                          </p>
                          <p className="card-text" style={{ fontSize: "19px" }}>
                            Condition: {book.condition}
                          </p>
                          <p className="card-text" style={{ fontSize: "19px" }}>
                            Price: {book.price}
                          </p>
                          <div>
                            <Link
                              to="/TextbookInfo"
                              state={{ book }}
                              className="btn btn-primary mb-3"
                            >
                              More information
                            </Link>
                          </div>
                          <div>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => addToCart(book)}
                            >
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          }
        />

        {/*Routes to all the other pages in the website.*/}
        <Route
          path="/Cart"
          element={
            <CartPage
              cartItems={cartItems}
              total={cartTotal}
              clearCart={clearCart}
            />
          }
        />
        <Route path="/sell" element={<SellPage addTextbook={addTextbook} />} />
        <Route path="/Discussion" element={<DiscussionPage />} />

        <Route
          path="/TextbookInfo"
          element={<TextbookInfoPage addToCart={addToCart} />}
        />

        <Route
          path="/Comment"
          element={
            <CommentPage
              commentsByPost={commentsByPost}
              addComment={addComment}
            />
          }
        />

        <Route path="/Chat" element={<ChatPage />} />

        <Route path="/Login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
