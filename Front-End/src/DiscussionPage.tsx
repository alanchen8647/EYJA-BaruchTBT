import { useState } from "react";
import "./App.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

type Post = {
  title: string;
  body: string;
};

function DiscussionPage() {
  fetch("/api/test-get")
    .then((response) => response.json())
    .then((data) => console.log(data));

  // Default posts (your original two cards)
  const [posts, setPosts] = useState<Post[]>([
    {
      title: "Best textbook for studying art history?",
      body: `Hey guys, I'm currently taking an art history class where we go over art from 
the Paleolithic era to the age of the Roman Empire. I already have a textbook, but I'm
very interested in this topic and would like to study more about it on my personal time. 
Does anyone know any textbooks sold on this website that's good for studying art history?`,
    },
    {
      title:
        'Anyone willing to trade an "Advanced Calculus Fundamentals of Mathematics by Carlos Polanco" textbook for a "calculus by Gilbert Strang" textbook?',
      body: `So, I made a stupid mistake and bought "calculus by Gilbert Strang" for my advanced calculus class, 
when I should have bought "Advanced Calculus Fundamentals of Mathematics by Carlos Polanco". I'm 
not gonna lie, I really don't want to spend more money and wait for a new textbook. I know that this 
sort of defeats the purpose of this website, but is anyone willing to trade their textbook for mine? 
My textbook is still is mint condition and I'm available for a few days, so anyone who wants my textbook 
can get it as soon as possible.`,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newPost: Post = {
      title: topic,
      body: content,
    };

    setPosts((prev) => [...prev, newPost]);
    setTopic("");
    setContent("");
    setShowForm(false);
  };

  return (
    <>
      <div
        className="container my-3"
        style={{ textDecoration: "underline" }}
      >
        <h1>Community Page</h1>
      </div>

      {/* Existing + user posts rendered as clickable cards */}
      {posts.map((post, index) => (
        <div className="container my-5" key={index}>
          <Link
            to="/Comment"
            state={{ post }}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              className="card"
              style={{ width: "18rem", border: "3px solid black" }}
            >
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}

      {/* Button to toggle the post form */}
      <div className="container mb-3">
        <button
          className="btn btn-primary"
          onClick={() => setShowForm((prev) => !prev)}
        >
          {showForm ? "Cancel" : "Make a Post"}
        </button>
      </div>

      {/* Post creation form */}
      {showForm && (
        <div className="container my-3">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="topicInput"
                className="form-label"
                style={{ fontWeight: "bold" }}
              >
                Topic
              </label>
              <input
                type="text"
                id="topicInput"
                className="form-control"
                placeholder="Enter the discussion topic"
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="contentTextarea"
                className="form-label"
                style={{ fontWeight: "bold" }}
              >
                Post
              </label>
              <textarea
                id="contentTextarea"
                className="form-control"
                rows={4}
                placeholder="Write your post here..."
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-success">
              Post
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default DiscussionPage;
