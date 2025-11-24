import React, { useState } from "react";
import "./App.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";

interface CommentPageProps {
  commentsByPost: { [title: string]: string[] };
  addComment: (postTitle: string, comment: string) => void;
}

function CommentPage({ commentsByPost, addComment }: CommentPageProps) {
  fetch("/api/test-get")
    .then((response) => response.json())
    .then((data) => console.log(data));

  const location = useLocation();
  const navigate = useNavigate();
  const { post } = (location.state as any) || {};

  if (!post) {
    return (
      <div className="container my-5">
        <p>No discussion selected.</p>
        <button
          className="btn btn-secondary mt-3"
          onClick={() => navigate("/Discussion")}
        >
          Back to Community Page
        </button>
      </div>
    );
  }

  const currentComments = commentsByPost[post.title] || [];

  const [showForm, setShowForm] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    addComment(post.title, commentText.trim());
    setCommentText("");
    setShowForm(false);
  };

  return (
    <>
      <div className="container my-3" style={{ textDecoration: "underline" }}>
        <h1>Comments</h1>
      </div>

      {/*This keeps the original topic at the top of the comments so that the user
      remembers what they are are adding comments to.*/}
      <div className="container my-3">
        <div
          className="card"
          style={{ width: "18rem", border: "3px solid black" }}
        >
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.body}</p>
          </div>
        </div>
      </div>

      {/*Dummy comments to show what the comment cards look like.*/}
      {currentComments.map((text, index) => (
        <div className="container my-3" key={index}>
          <div
            className="card"
            style={{ width: "18rem", border: "3px solid black" }}
          >
            <div className="card-body">
              <p className="card-text">{text}</p>
            </div>
          </div>
        </div>
      ))}

      <div className="container my-4">
        <button
          className="btn btn-primary w-100"
          onClick={() => setShowForm((prev) => !prev)}
        >
          {showForm ? "Cancel" : "Make a Comment"}
        </button>
      </div>

      {/*Lets the user add comments under a specific discussion topic.*/}
      {showForm && (
        <div className="container my-3">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="commentTextarea"
                className="form-label"
                style={{ fontWeight: "bold" }}
              >
                Your Comment
              </label>
              <textarea
                id="commentTextarea"
                className="form-control"
                rows={3}
                required
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success">
              Post Comment
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default CommentPage;
