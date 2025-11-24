import React, { useState } from "react";
import "./App.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CartPage from "./CartPage.tsx";
import SellPage from "./SellPage.tsx";
import DiscussionPage from "./DiscussionPage.tsx";
import Textbooks1 from "../images/textbooks1.jpg";
import Mathtextbook from "../images/math-textbook.jpg";

// Type for textbooks shown on the home page
type Textbook = {
  title: string;
  subject: string;
  course: string;
  condition: string;
  price: string;
  image: string;
  contact: string;
};

function App() {
  const [textbooks, setTextbooks] = useState<Textbook[]>([]);

  const addTextbook = (newBook: Textbook) => {
    setTextbooks((prev) => [...prev, newBook]);
  };

  return (
    <BrowserRouter>
      <header>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Navbar
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
              </ul>

              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>
      </header>

      <Routes>
        {/* HOME PAGE */}
        <Route
          path="/"
          element={
            <>
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
                  {/* Static card */}
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
                          <a href="#" className="btn btn-primary mb-3">
                            More information
                          </a>
                        </div>
                        <div>
                          <a href="#" className="btn btn-primary">
                            Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic cards */}
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
                            <a href="#" className="btn btn-primary mb-3">
                              More information
                            </a>
                          </div>
                          <div>
                            <a href="#" className="btn btn-primary">
                              Add to cart
                            </a>
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

        <Route path="/Cart" element={<CartPage />} />
        <Route path="/sell" element={<SellPage addTextbook={addTextbook} />} />
        <Route path="/Discussion" element={<DiscussionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
