import { useState, useEffect } from "react";
import { getCommunityPosts, createCommunityPost, getPostComment, createPostComment } from "../api.jsx";

type Post = {
  id?: number;
  title: string;
  content: string;
};

export function DiscussionPage() {
  const [comments, setComments] = useState(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTopic, setNewTopic] = useState("");
  const [newContent, setNewContent] = useState("");
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getCommunityPosts();
      setPosts(fetchedPosts);
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      if (selectedPost) {
        const fetchedComments = await getPostComment(selectedPost.id);
        setComments(fetchedComments || []);
      }
    }
    fetchComments();
  }, [selectedPost]);

  //listen to 

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    const newPost: Post = {
      title: newTopic,
      content: newContent,
    };
    createCommunityPost(newPost);
    setPosts((prev) => [newPost, ...prev]);
    setNewTopic("");
    setNewContent("");
    setShowCreateForm(false);
    setSelectedPost(newPost);
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPost || !commentText.trim()) return;
    createPostComment(selectedPost.id, commentText.trim());

    setCommentText("");
  };

  const currentComments = selectedPost ? (comments || []) : [];

  return (
    <div className="container-fluid py-4" style={{ height: "calc(100vh - 70px)" }}>
      <div className="row h-100 g-0 shadow-sm border rounded overflow-hidden">
        {/* LEFT SIDEBAR: Topic List */}
        <div className="col-md-4 col-lg-3 border-end bg-panel d-flex flex-column h-100">
          <div className="p-3 border-bottom bg-canvas d-flex justify-content-between align-items-center">
            <h5 className="mb-0 fw-bold text-primary">Discussions</h5>
            <button
              className="btn btn-sm btn-primary rounded-pill"
              onClick={() => { setShowCreateForm(true); setSelectedPost(null); }}
            >
              <i className="bi bi-plus-lg"></i> New
            </button>
          </div>

          <div className="flex-grow-1 overflow-auto">
            {posts.map((post, index) => (
              <div
                key={index}
                className={`p-3 border-bottom cursor-pointer transition-all ${selectedPost?.title === post.title ? 'bg-primary-subtle border-start border-primary border-4' : 'hover-bg-light'}`}
                onClick={() => { setSelectedPost(post); setShowCreateForm(false); }}
                style={{ cursor: 'pointer' }}
              >
                <h6 className="fw-bold mb-1 text-truncate">{post.title}</h6>
                <p className="small mb-0 text-truncate opacity-75">{post.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT MAIN AREA: Content */}
        <div className="col-md-8 col-lg-9 bg-canvas h-100 d-flex flex-column">

          {/* CREATE POST FORM */}
          {showCreateForm ? (
            <div className="p-5 h-100 overflow-auto">
              <div className="card shadow-sm border-0 mw-100" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div className="card-body p-4">
                  <h3 className="fw-bold mb-4 text-primary">Start a New Discussion</h3>
                  <form onSubmit={handleCreatePost}>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Topic Title</label>
                      <input
                        className="form-control form-control-lg"
                        value={newTopic}
                        onChange={(e) => setNewTopic(e.target.value)}
                        placeholder="e.g., Best prof for CIS 4160?"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label fw-bold">Details</label>
                      <textarea
                        className="form-control"
                        rows={6}
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        placeholder="Share your thoughts..."
                        required
                      />
                    </div>
                    <div className="d-flex justify-content-end gap-2">
                      <button type="button" className="btn btn-light" onClick={() => setShowCreateForm(false)}>Cancel</button>
                      <button type="submit" className="btn btn-primary px-4">Post Discussion</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : selectedPost ? (
            /* TOPIC DETAILS VIEW */
            <div className="d-flex flex-column h-100">
              {/* Header Post */}
              <div className="p-4 bg-panel border-bottom shadow-sm overflow-auto" style={{ maxHeight: '40%' }}>
                <h2 className="fw-bold text-primary mb-3">{selectedPost.title}</h2>
                <p className="lead" style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>{selectedPost.content}</p>
              </div>

              {/* Comments Area - Flexible/Scrollable */}
              <div className="flex-grow-1 p-4 overflow-auto bg-canvas">
                <h5 className="fw-bold opacity-75 mb-3">Comments</h5>

                <div className="d-flex flex-column gap-3">
                  {currentComments.length === 0 ? (
                    <div className="text-center opacity-50 py-5">
                      <i className="bi bi-chat-square-dots fs-1 d-block mb-2"></i>
                      No comments yet. Start the conversation!
                    </div>
                  ) : (
                    currentComments.map((comment: any, id) => (
                      <div key={id} className="d-flex gap-3">
                        <div className="flex-shrink-0">
                          <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                            <i className="bi bi-person-fill"></i>
                          </div>
                        </div>
                        <div className="bg-panel p-3 rounded shadow-sm border border-light-subtle" style={{ maxWidth: '85%' }}>
                          {comment?.content}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Input Area - Fixed at Bottom */}
              <div className="p-3 bg-panel border-top">
                <form onSubmit={handlePostComment} className="d-flex gap-2">
                  <input
                    className="form-control"
                    placeholder="Type a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <button type="submit" className="btn btn-primary">
                    <i className="bi bi-send-fill"></i>
                  </button>
                </form>
              </div>
            </div>
          ) : (
            /* EMPTY STATE */
            <div className="d-flex flex-column align-items-center justify-content-center h-100 opacity-75">
              <i className="bi bi-chat-left-text fs-1 mb-3"></i>
              <h4>Select a discussion to view details</h4>
              <p>Or start a new topic by clicking "New"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DiscussionPage;
