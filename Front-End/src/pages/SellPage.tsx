import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { createTextbook } from "../api.jsx";
// import {createTextbook} from "../api.jsx";

//The sell page allows users to input textbook information to create a new textbook listing.
function SellPage() {
  //Gets the current user information from the authentication context.
  const { user } = useAuth();

  const navigate = useNavigate();

  //Form state to hold the textbook information input by the user.
  const [form, setForm] = useState({
    seller_id: user?.id || "",
    title: "",
    author: "",
    subject: "",
    course_num: "",
    condition: "",
    price: "",
    description: "",
  });

  //State to hold the uploaded book images.
  const [bookImages, setBookImages] = useState<FileList | null>(null);

  //Handles the form submission to create a new textbook listing.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!bookImages) {
      alert("Please upload at least one image of the book.");
      return;
    }
    //Calls the createTextbook API function to add the new textbook.
    try {
      await createTextbook({ ...form, bookImages });
      alert("Textbook added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding textbook:", error);
      alert("Failed to add textbook. Please try again.");
    }
  };

  //Handles the image file input changes and updates the state.
  const handleImageUploads = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setBookImages(e.target.files);
    }
  };


  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow border-0">
              <div className="card-header bg-primary text-white p-4">
                <h2 className="card-title fw-bold mb-0 text-center text-white">List a Textbook Description</h2>
              </div>

              <div className="card-body p-5">
                <form onSubmit={handleSubmit}>
                  {/* Basic Info */}
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label htmlFor="titleInput" className="form-label fw-bold">Textbook Title</label>
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
                    <div className="col-md-6">
                      <label htmlFor="authorInput" className="form-label fw-bold">Author</label>
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
                  </div>

                  {/* Course Info */}
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label htmlFor="subjectInput" className="form-label fw-bold">Subject</label>
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
                    <div className="col-md-6">
                      <label htmlFor="courseInput" className="form-label fw-bold">Course Number</label>
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
                  </div>

                  {/* Details */}
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label htmlFor="priceInput" className="form-label fw-bold">Price ($)</label>
                      <input
                        type="number"
                        className="form-control"
                        id="priceInput"
                        placeholder="50.00"
                        required
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="conditionInput" className="form-label fw-bold">Condition</label>
                      <select
                        className="form-select"
                        id="conditionInput"
                        required
                        value={form.condition}
                        onChange={(e) => setForm({ ...form, condition: e.target.value })}
                      >
                        <option value="">Select Condition</option>
                        <option value="New">New</option>
                        <option value="Like New">Like New</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                        <option value="Poor">Poor</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="imageInput" className="form-label fw-bold">Images</label>
                    <input
                      className="form-control"
                      id="bookImagesInput"
                      type="file"
                      required
                      accept="image/*"
                      multiple
                      onChange={handleImageUploads}
                    />
                    <div className="form-text">Upload at least one image matching the book cover.</div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="descriptionTextarea" className="form-label fw-bold">Description</label>
                    <textarea
                      className="form-control"
                      id="descriptionTextarea"
                      rows={4}
                      placeholder="Describe the condition, edition, or any other details..."
                      required
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="d-grid mt-5">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Create Listing
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SellPage;
