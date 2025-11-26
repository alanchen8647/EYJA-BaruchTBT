import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

interface SellPageProps {
  addTextbook: (book: {
    title: string;
    subject: string;
    course: string;
    condition: string;
    price: string;
    image: string;
    contact: string;
    description: string; 
  }) => void;
}

function SellPage({ addTextbook }: SellPageProps) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [course, setCourse] = useState("");
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const imageURL = imageFile ? URL.createObjectURL(imageFile) : "";

    addTextbook({
      title,
      subject,
      course,
      condition,
      price,
      image: imageURL,
      contact,
      description,
    });

    //Send the user to the home page after adding a textbook card with the sell form.
    navigate("/");
  };

  return (
    <>
      {/*All this code is the form that the user will use to type in information that
      will be shown in their textbook cards and textbook info page.*/}
      <div className="container my-3" style={{ textDecoration: "underline" }}>
        <h1>Sell Page</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="container my-5">
          <div className="mb-4">
            <label
              htmlFor="titleInput"
              className="form-label"
              style={{ fontWeight: "bold" }}
            >
              Textbook Title
            </label>
            <input
              type="text"
              className="form-control"
              id="titleInput"
              placeholder="E.g. Calculus by Gilbert Strang"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="subjectInput"
              className="form-label"
              style={{ fontWeight: "bold" }}
            >
              Subject
            </label>
            <input
              type="text"
              className="form-control"
              id="subjectInput"
              placeholder="E.g. Math"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="courseInput"
              className="form-label"
              style={{ fontWeight: "bold" }}
            >
              Course Number
            </label>
            <input
              type="text"
              className="form-control"
              id="courseInput"
              placeholder="E.g. MTH 3150"
              required
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="conditionInput"
              className="form-label"
              style={{ fontWeight: "bold" }}
            >
              Condition
            </label>
            <input
              type="text"
              className="form-control"
              id="conditionInput"
              placeholder="E.g. Used, new, worn-out"
              required
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="priceInput"
              className="form-label"
              style={{ fontWeight: "bold" }}
            >
              Price
            </label>
            <input
              type="text"
              className="form-control"
              id="priceInput"
              placeholder="E.g. $50.00"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="imageInput"
              className="form-label"
              style={{ fontWeight: "bold" }}
            >
              Picture of Textbook
            </label>
            <input
              className="form-control form-control-lg"
              id="imageInput"
              type="file"
              required
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImageFile(e.target.files[0]);
                }
              }}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="descriptionTextarea"
              className="form-label"
              style={{ fontWeight: "bold" }}
            >
              Textbook Description
            </label>
            <textarea
              className="form-control"
              id="descriptionTextarea"
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="mb-3">
            <label
              htmlFor="contactInput"
              className="form-label"
              style={{ fontWeight: "bold" }}
            >
              Seller Contact
            </label>
            <input
              type="text"
              className="form-control"
              id="contactInput"
              placeholder="E.g. Phone number or Email"
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>

          {/*Submits the form for the user.*/}
          <button type="submit" className="btn btn-primary mt-4">
            Add Textbook
          </button>
        </div>
      </form>
    </>
  );
}

export default SellPage;
