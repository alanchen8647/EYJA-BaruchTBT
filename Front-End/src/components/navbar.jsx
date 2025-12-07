import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { supabase } from "../supabaseClient.js";
import { useNavigate} from "react-router-dom";

export default function Navbar() {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/Login");
  }

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  }
  
  return (
    <header className="sticky-top">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
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
            <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
          </button>

          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center gap-3">
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/sell')}`} to="/sell">
                  Sell
                </Link>
              </li>

              <li className="nav-item">
                <Link className={`nav-link ${isActive('/Discussion')}`} to="/Discussion">
                  Community
                </Link>
              </li>

              <li className="nav-item">
                <Link className={`nav-link ${isActive('/Chat')}`} to="/Chat">
                  Chat
                </Link>
              </li>
              
              {auth.user ? (
                <>
                  <li className="nav-item">
                    <span className="nav-link text-light opacity-75">
                      {auth.user.email}
                    </span>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-primary btn-sm" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link className="btn btn-primary btn-sm" to="/Login">
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