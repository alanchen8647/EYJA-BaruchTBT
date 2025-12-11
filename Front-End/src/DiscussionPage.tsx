import { useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";

type Post = { title: string; body: string };

export default function DiscussionPage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      title: "Best textbook for studying art history?",
      body: `Hey guys, I'm currently taking an art history class where we go over art from 
the Paleolithic era to the age of the Roman Empire. I already have a textbook, but I'm
very interested in this topic and would like to study more about it on my personal time. 
Does anyone know any textbooks sold on this website that's good for studying art history?`,
    },
    {
      title: `Trade calculus textbooks?`,
      body: `So, I made a mistake and bought "calculus by Gilbert Strang" for my advanced calculus class, 
when I should have bought "Advanced Calculus Fundamentals of Mathematics by Carlos Polanco". I don't want to spend more money and wait for a new textbook. 
Is anyone willing to trade their textbook for mine? It's in mint condition and I'm available for a few days.`,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPost: Post = { title: topic, body: content };
    setPosts((prev) => [...prev, newPost]);
    setTopic("");
    setContent("");
    setShowForm(false);
  };

  const toggleExpand = (index: number) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="discussion-page">
      <div className="container py-4">
        <p className="text-muted mb-3">
          Share tips, ask questions, and trade textbooks. Be kind and keep it on-topic.
        </p>

        <div className="row g-3">
          {posts.map((post, index) => {
            const isExpanded = !!expanded[index];
            const needsToggle = post.body.trim().length > 160;
            return (
              <div className="col-12 col-md-6 col-lg-4" key={index}>
                <div className="card discussion-card h-100">
                  <div className="card-body py-3">
                    <h6 className="card-title mb-2 fw-semibold">{post.title}</h6>

                    <div className={isExpanded ? "card-text mb-2" : "card-text mb-2 clamp-4"}>
                      {post.body}
                    </div>

                    {needsToggle && (
                      <span
                        className={`see-more-inline ${isExpanded ? "expanded" : ""}`}
                        role="button"
                        onClick={() => toggleExpand(index)}
                        aria-expanded={isExpanded}
                      >
                        {isExpanded ? "See less" : "See more"}
                      </span>
                    )}

                    <div className="d-flex justify-content-end mt-2">
                      <Link to="/Comment" state={{ post }} className="btn btn-outline-primary btn-sm">
                        Comment
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {showForm && (
          <div className="card mt-3">
            <div className="card-body">
              <h2 className="h6 fw-bold mb-3">Create a new post</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label htmlFor="topicInput" className="form-label fw-semibold mb-1">
                    Topic
                  </label>
                  <input
                    type="text"
                    id="topicInput"
                    className="form-control form-control-sm"
                    placeholder="Enter the discussion topic"
                    required
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="contentTextarea" className="form-label fw-semibold mb-1">
                    Post
                  </label>
                  <textarea
                    id="contentTextarea"
                    className="form-control form-control-sm"
                    rows={4}
                    placeholder="Write your post here..."
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-success btn-sm">
                    Post
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
