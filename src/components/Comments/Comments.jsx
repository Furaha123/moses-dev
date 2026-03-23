import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { db, auth } from "../../firebase";
import { ref, push, get, query, orderByChild } from "firebase/database";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import AuthModal from "./AuthModal";
import "./comments.css";

const Comments = () => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const fetchComments = async () => {
    try {
      const commentsRef = query(ref(db, "comments"), orderByChild("createdAt"));
      const snapshot = await get(commentsRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const list = Object.entries(data)
          .map(([id, val]) => ({ id, ...val }))
          .sort((a, b) => b.createdAt - a.createdAt);
        setComments(list);
      } else {
        setComments([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to load comments.");
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return toast.error("Please write a comment.");

    const newComment = {
      id: Date.now().toString(),
      name: user.displayName || user.email,
      comment: comment.trim(),
      createdAt: Date.now(),
    };

    setComments((prev) => [newComment, ...prev]);
    setComment("");

    try {
      await push(ref(db, "comments"), {
        name: newComment.name,
        comment: newComment.comment,
        createdAt: newComment.createdAt,
      });
    } catch {
      toast.error("Failed to post comment.");
      setComments((prev) => prev.filter((c) => c.id !== newComment.id));
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setShowLogoutConfirm(false);
    toast.success("Logged out.");
  };

  return (
    <section className="comments section" id="comments">
      <h2 className="section__title">Comments</h2>
      <span className="section__subtitle">What do you think?</span>

      <div className="comments__container container">
        {user ? (
          <div className="comments__auth-bar">
            <span>Commenting as <strong>{user.displayName || user.email}</strong></span>
            <button className="comments__logout" onClick={() => setShowLogoutConfirm(true)}>
              Logout <i className="bx bx-log-out"></i>
            </button>
          </div>
        ) : (
          <div className="comments__cta">
            <p className="comments__cta-text">Have something to say? Join the conversation.</p>
            <button className="button button--flex" onClick={() => setShowModal(true)}>
              Leave a Comment <i className="bx bx-comment-add button__icon"></i>
            </button>
          </div>
        )}

        {user && (
          <form className="comments__form" onSubmit={handleSubmit}>
            <textarea
              className="comments__input comments__textarea"
              placeholder="Write your comment..."
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button className="button button--flex">
              Post Comment{" "}
              <i className="bx bx-send button__icon"></i>
            </button>
          </form>
        )}

        <h4 className="comments__recent-title">Recent Comments</h4>

        {comments.length === 0 ? (
          <p className="comments__empty">No comments yet. Be the first!</p>
        ) : (
          <div className="comments__slider">
            <button
              className="comments__arrow comments__arrow--left"
              onClick={() => setActiveIndex((prev) => (prev === 0 ? comments.length - 1 : prev - 1))}
            >
              <i className="bx bx-chevron-left"></i>
            </button>

            <div className="comments__slide">
              <div className="comments__card">
                <div className="comments__header">
                  <div className="comments__avatar">
                    {comments[activeIndex].name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="comments__name">{comments[activeIndex].name}</h4>
                    <span className="comments__date">
                      {comments[activeIndex].createdAt
                        ? new Date(comments[activeIndex].createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "Just now"}
                    </span>
                  </div>
                </div>
                <p className="comments__text">{comments[activeIndex].comment}</p>
              </div>
            </div>

            <button
              className="comments__arrow comments__arrow--right"
              onClick={() => setActiveIndex((prev) => (prev === comments.length - 1 ? 0 : prev + 1))}
            >
              <i className="bx bx-chevron-right"></i>
            </button>

            <div className="comments__dots">
              {comments.map((_, i) => (
                <span
                  key={i}
                  className={`comments__dot ${i === activeIndex ? "active" : ""}`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <AuthModal
          onClose={() => setShowModal(false)}
          onSuccess={() => setShowModal(false)}
        />
      )}

      {showLogoutConfirm && createPortal(
        <div className="auth-overlay" onClick={() => setShowLogoutConfirm(false)}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "360px" }}>
            <h3 className="auth-modal__title">Logout</h3>
            <p style={{ color: "var(--text-color)", margin: "0.5rem 0 1.5rem" }}>
              Are you sure you want to logout?
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button className="button button--flex" style={{ flex: 1, justifyContent: "center" }} onClick={handleLogout}>
                Yes, Logout
              </button>
              <button className="comments__logout" style={{ flex: 1, justifyContent: "center" }} onClick={() => setShowLogoutConfirm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default Comments;
