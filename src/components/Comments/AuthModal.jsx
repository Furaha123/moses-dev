import { useState } from "react";
import { createPortal } from "react-dom";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
import "./authModal.css";

const googleProvider = new GoogleAuthProvider();

const AuthModal = ({ onClose, onSuccess }) => {
  const [tab, setTab] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed in with Google!");
      onSuccess();
    } catch {
      setError("Google sign-in failed. Try again.");
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) return setError("Please fill all fields.");
    if (tab === "signup" && !name.trim()) return setError("Please enter your name.");

    setLoading(true);
    try {
      if (tab === "signup") {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(user, { displayName: name.trim() });
        toast.success("Account created!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Welcome back!");
      }
      onSuccess();
    } catch (err) {
      const messages = {
        "auth/email-already-in-use": "This email is already registered. Try logging in.",
        "auth/user-not-found": "No account found with this email.",
        "auth/wrong-password": "Incorrect password. Please try again.",
        "auth/weak-password": "Password must be at least 6 characters.",
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/invalid-credential": "Incorrect email or password. Please try again.",
        "auth/too-many-requests": "Too many failed attempts. Please try again later.",
        "auth/network-request-failed": "Network error. Check your connection.",
      };
      setError(messages[err.code] || err.message || "Something went wrong.");
    }
    setLoading(false);
  };

  const modal = (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal__close" onClick={onClose}>
          <i className="bx bx-x"></i>
        </button>

        <h3 className="auth-modal__title">
          {tab === "login" ? "Welcome Back" : "Create Account"}
        </h3>
        <p className="auth-modal__subtitle">
          {tab === "login" ? "Login to leave a comment" : "Sign up to join the conversation"}
        </p>

        <div className="auth-modal__tabs">
          <button
            className={`auth-modal__tab ${tab === "login" ? "active" : ""}`}
            onClick={() => { setTab("login"); setError(""); }}
          >
            Login
          </button>
          <button
            className={`auth-modal__tab ${tab === "signup" ? "active" : ""}`}
            onClick={() => { setTab("signup"); setError(""); }}
          >
            Sign Up
          </button>
        </div>

        <form className="auth-modal__form" onSubmit={handleSubmit}>
          {tab === "signup" && (
            <input
              type="text"
              className="auth-modal__input"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            className="auth-modal__input"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="auth-modal__input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <div className="auth-modal__error">
              <i className="bx bx-error-circle"></i>
              <span>{error}</span>
            </div>
          )}

          <button className="button button--flex auth-modal__btn" disabled={loading}>
            {loading ? "Please wait..." : tab === "login" ? "Login" : "Sign Up"}
            <i className="bx bx-log-in button__icon"></i>
          </button>
        </form>

        <div className="auth-modal__divider">
          <span>or</span>
        </div>

        <button
          className="auth-modal__google"
          onClick={handleGoogle}
          disabled={loading}
          type="button"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="20" />
          Continue with Google
        </button>

        <p className="auth-modal__switch">
          {tab === "login" ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => setTab(tab === "login" ? "signup" : "login")}>
            {tab === "login" ? "Sign up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};

export default AuthModal;
