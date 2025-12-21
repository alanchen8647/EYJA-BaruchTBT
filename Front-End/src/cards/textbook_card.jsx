import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import placeholderImage from "../../images/placeholder.jpg";

export default function TextbookCard({ textbook }) {
  const navigate = useNavigate();
  //Renders a card displaying textbook information.
  return (
    <div className="col-md-3 mb-4">
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={textbook.images_url?.[0] || placeholderImage}
          className="card-img-top"
          alt={textbook.title}
        />
        <div className="card-body">
          <h5 className="card-title">
            {textbook.title}
          </h5>
          <h6 className="card-subtitle mb-2">By {textbook.author}</h6>
          <h6 className="card-subtitle mb-2">Sold by {textbook.profiles.user_name}</h6>
          <p className="card-text" style={{ fontSize: "19px" }}>
            Course Number: {textbook.course_num}
          </p>
          <p className="card-text" style={{ fontSize: "19px" }}>
            Condition: {textbook.condition}
          </p>
          <p className="card-text fw-bold text-primary" style={{ fontSize: "19px" }}>
            Price: ${textbook.price}
          </p>
          <div>
            <Link
              to={"/TextbookInfo" + "/" + textbook.id}
              className="btn btn-primary mb-3"
            >
              More information
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
