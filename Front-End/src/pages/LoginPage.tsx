
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../supabaseClient.js";
import { useAuth } from "../context/AuthContext.jsx";

function LoginPage() {
  const navigate = useNavigate();

  //Redirects to home if already logged in.
  const user = useAuth();
  if (user?.user) {
    navigate("/");
  }

  //State variables for email, password, and whether to sign in or sign up.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [SignInOrSignUp, setSignInOrSignUp] = useState("Sign In");


  //Handles user sign-in using Supabase authentication.
  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      alert("Error signing in: " + error.message);
      return;
    }
    if (data != null) {
      navigate("/");
    } else {
      alert("No user found with these credentials.");
    }
  };

  //Handles user sign-up using Supabase authentication and creates a profile.
  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      alert("Error signing up: " + error.message);
      return;
    }

    const { error: profileError } = await supabase.from('profiles').insert([{
      uid: data.user?.id,
      user_name: email.split('@')[0],
      avatar_url: '',
    }]);

    if (profileError) {
      alert("Error creating profile: " + profileError.message);
      return;
    }
    navigate("/");
  };


  //Renders the login/sign-up form with email and password fields.
  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <div className="card shadow p-5 border-0" style={{ maxWidth: '500px', width: '100%' }}>
        <h2 className="text-center mb-4 text-primary">{SignInOrSignUp}</h2>
        <form>
          <div className="form-outline mb-4">
            <label
              className="form-label"
              htmlFor="form2Example1"
              style={{ fontWeight: "500" }}
            >
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="form2Example1"
              className="form-control"
              required
            />
          </div>

          <div className="form-outline mb-4">
            <label
              className="form-label"
              htmlFor="form2Example2"
              style={{ fontWeight: "500" }}
            >
              Password
            </label>
            <input
              type="password"
              id="form2Example2"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/*Sign in button takes the user home*/}
          <button
            type="button"
            className="btn btn-primary btn-block mb-4 w-100"
            onClick={SignInOrSignUp === "Sign In" ? handleSignIn : handleSignUp}
          >
            {SignInOrSignUp}
          </button>
        </form>

        <div className="text-center">
          {SignInOrSignUp === "Sign In" ? (
            <p className="mb-0 text-muted">
              Don't have an account? <a href="#" className="fw-bold text-decoration-none" style={{ color: 'var(--secondary-color)' }} onClick={() => setSignInOrSignUp("Sign Up")}>Sign Up</a>
            </p>
          ) : (
            <p className="mb-0 text-muted">
              Already have an account? <a href="#" className="fw-bold text-decoration-none" style={{ color: 'var(--secondary-color)' }} onClick={() => setSignInOrSignUp("Sign In")}>Sign In</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
