import React, { useState } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";

interface CommentPageProps {
  commentsByPost: { [title: string]: string[] };
  addComment: (postTitle: string, comment: string) => void;
}

export function CommentPage({ commentsByPost, addComment }: CommentPageProps) {
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

  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    addComment(post.title, commentText.trim());
    setCommentText("");
  };

  return (
    <>
      <div className="container my-5">
        <button
          className="btn btn-link text-decoration-none text-muted ps-0 mb-4 d-flex align-items-center gap-2"
          onClick={() => navigate("/Discussion")}
          style={{ width: 'fit-content', fontWeight: '500' }}
        >
          <i className="bi bi-arrow-left"></i> Back to Community
        </button>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Main Post */}
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-body p-4">
                <h2 className="card-title fw-bold text-primary mb-3">{post.title}</h2>
                <p className="card-text lead" style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
                  {post.body}
                </p>
                <div className="text-muted small border-top pt-3 mt-4">
                  Original Post
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <h4 className="mb-4 fw-bold">Comments ({currentComments.length})</h4>

            <div className="d-flex flex-column gap-3 mb-5">
              {currentComments.length === 0 ? (
                <div className="text-center text-muted py-5 bg-light rounded">
                  No comments yet. Be the first to share your thoughts!
                </div>
              ) : (
                currentComments.map((text, index) => (
                  <div className="card border-0 bg-light" key={index}>
                    <div className="card-body p-3">
                      <p className="card-text mb-0">{text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Comment Form */}
            <div className="card shadow-sm border-0 bg-white">
              <div className="card-body p-4">
                <h5 className="card-title fw-bold mb-3">Leave a Comment</h5>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <textarea
                      className="form-control bg-light border-0"
                      rows={3}
                      placeholder="Type your response here..."
                      required
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      style={{ resize: 'none' }}
                    />
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary px-4">
                      Post Comment
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

export default CommentPage;
