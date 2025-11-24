import React from "react";
import { useState } from "react";
import "./App.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SellPage from "./SellPage.tsx";
import DiscussionPage from "./DiscussionPage.tsx";
import Textbooks1 from "../images/textbooks1.jpg";
import Mathtextbook from "../images/math-textbook.jpg";

function App() {
  fetch("/api/test-get")
    .then((response) => response.json())
    .then((data) => console.log(data));

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

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Cart
                  </a>
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
        <Route path="/" element={
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
              <div className="row">
                <div className="col-1">
                  <div className="card" style={{ width: "18rem" }}>
                    <img
                      src={Mathtextbook}
                      className="card-img-top"
                      alt="A calculus textbook"
                    />
                    <div className="card-body">
                      <h5 className="card-title">Card title</h5>
                      <p className="card-text">
                        Some quick example text.
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
              </div>
            </div>
          </>
        } />

        <Route path="/sell" element={<SellPage />} />
        <Route path="/Discussion" element={<DiscussionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
