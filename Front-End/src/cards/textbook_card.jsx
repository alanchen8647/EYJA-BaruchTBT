import React from "react";
import { Link } from "react-router-dom";

export default function TextbookCard({ textbook }) {
  return (
    <div className="col-md-3 mb-4">
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={textbook.image_url}
          className="card-img-top"
          alt={textbook.title}
        />
        <div className="card-body">
          <h5 className="card-title">
            {textbook.title}
          </h5>
          <h6 class="card-subtitle mb-2 text-muted">By {textbook.author}</h6>
          <h6 class="card-subtitle mb-2 text-muted">Sold by {textbook.profiles.user_name}</h6>
          <p className="card-text" style={{ fontSize: "19px" }}>
            Course Number: {textbook.course_num}
          </p>
          <p className="card-text" style={{ fontSize: "19px" }}>
            Condition: {textbook.condition}
          </p>
          <p className="card-text" style={{ fontSize: "19px" }}>
            Price: ${textbook.prices}
          </p>
          <div>
            <Link
              to="/TextbookInfo"
              state={{ book: textbook }}
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
  );
}
