import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";
import { createTextbook } from "../api.jsx";
// import {createTextbook} from "../api.jsx";

function SellPage(){
  const {user} = useAuth();
  console.log("Current user:", user);
  const navigate = useNavigate();
  const [form , setForm] = useState({
    seller_id: user?.id || "",
    title: "",
    author: "",
    subject: "",
    course_num: "",
    condition: "",
    price: "",
    description: "",
  });

  const [bookImages, setBookImages] = useState<FileList | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form data to be submitted:", form);
    if (!bookImages) {
      alert("Please upload at least one image of the book.");
      return;
    }
    try {
      await createTextbook({ ...form, bookImages });
      alert("Textbook added successfully!");
      // navigate("/");
    } catch (error) {
      console.error("Error adding textbook:", error);
      alert("Failed to add textbook. Please try again.");
    }
  };

  const handleImageUploads = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setBookImages(e.target.files);
    }
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
              placeholder="E.g. Calculus"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="authorInput"
              className="form-label"
              style={{ fontWeight: "bold" }}
            >
              Author of the Textbook
            </label>
            <input
              type="text"
              className="form-control"
              id="authorInput"
              placeholder="E.g. Gilbert Strang"
              required
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
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
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
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
              value={form.course_num}
              onChange={(e) => setForm({ ...form, course_num: e.target.value })}
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
              value={form.condition}
              onChange={(e) => setForm({ ...form, condition: e.target.value })}
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
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="imageInput"
              className="form-label"
              style={{ fontWeight: "bold" }}
            >
              Book additional images
            </label>
            <input
              className="form-control form-control-lg"
              id="bookImagesInput"
              type="file"
              required
              accept="image/*"
              multiple
              onChange={handleImageUploads}
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
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            ></textarea>
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
