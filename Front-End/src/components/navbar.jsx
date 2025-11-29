import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { supabase } from "../supabaseClient.js";


export default function Navbar() {
  const auth = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  }
  
  return (
          <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary bg-primary">
              <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                  Baruch TBT
                </Link>
    
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
    
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        aria-current="page"
                        to="/Cart"
                      >
                        Cart
                      </Link>
                    </li>
    
                    <li className="nav-item">
                      <Link className="nav-link active" to="/sell">
                        Sell
                      </Link>
                    </li>
    
                    <li className="nav-item">
                      <Link className="nav-link active" to="/Discussion">
                        Discussion/Community
                      </Link>
                    </li>
    
                    <li className="nav-item">
                      <Link className="nav-link active" to="/Chat">
                        Chat
                      </Link>
                    </li>
                    {auth.user ? (
                      <li className="nav-item d-flex align-items-center">
                        <span className="nav-link active">
                          Welcome, {auth.user.email}!
                        </span>
                        <button className="btn btn-link nav-link active" onClick={handleLogout}>
                          Logout
                        </button>
                      </li>
                    ) : (
                      <li className="nav-item">
                        <Link className="nav-link active" to="/Login">
                          Login
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </nav>
          </header>
    );
}