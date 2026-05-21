import { Link, useLocation } from "react-router-dom";
import React from "react";
import "./Navbar.css";

export default function Navbar() {

  const location = useLocation();

  const isLoggedIn = Boolean(
    localStorage.getItem("token")
  );

  return (
    <nav className="navbar">

      {/* LEFT */}
      <div className="navbar-left">

        

        <span className="brand">
          Floresta
        </span>
      </div>

      {/* RIGHT */}
      <div className="navbar-right">

        <Link
          to="/detect"
          className={
            location.pathname === "/detect"
              ? "nav-link active"
              : "nav-link"
          }
        >
          AI Detect
        </Link>

        <Link
          to="/gardener"
          className={
            location.pathname === "/gardener"
              ? "nav-link active"
              : "nav-link"
          }
        >
          Gardeners
        </Link>

        <Link
          to="/plants"
          className={
            location.pathname === "/plants"
              ? "nav-link active"
              : "nav-link"
          }
        >
          Plants
        </Link>

        {/* PROFILE */}
        {isLoggedIn ? (
          <>
            <Link
              to="/profile"
              className={
                location.pathname === "/profile"
                  ? "icon-link active"
                  : "icon-link"
              }
              title="Profile"
            >
              👤
            </Link>

            <Link
              to="/cart"
              className={
                location.pathname === "/cart"
                  ? "icon-link active"
                  : "icon-link"
              }
              title="Cart"
            >
              🛒
            </Link>
          </>
        ) : (
          <Link
            to="/login"
            className={
              location.pathname === "/login"
                ? "nav-link active"
                : "nav-link"
            }
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}