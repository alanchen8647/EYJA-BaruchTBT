import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

function LoginPage() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/");
  };

  return (
    <>
      <div className="Container my-5">
        <form>
          <div data-mdb-input-init className="form-outline mb-4">
            <input type="email" id="form2Example1" className="form-control" required />
            <label
              className="form-label"
              htmlFor="form2Example1"
              style={{ fontWeight: "bold" }}
            >
              Email address
            </label>
          </div>

          <div data-mdb-input-init className="form-outline mb-4">
            <input
              type="password"
              id="form2Example2"
              className="form-control"
              required
            />
            <label
              className="form-label"
              htmlFor="form2Example2"
              style={{ fontWeight: "bold" }}
            >
              Password
            </label>
          </div>

          {/*Sign in button takes the user home*/}
          <button
            type="button"
            className="btn btn-primary btn-block mb-4"
            onClick={handleSignIn}
          >
            Sign in
          </button>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
