import React from "react";
import { Link } from "react-router-dom";
import "../styles/NotFound.css";

export default function NotFound() {
  return (
    <section className="section notfound">
      <div className="container">
        <h1 className="notfound__title">404</h1>
        <p className="notfound__text">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <Link to="/" className="btn btn--primary">Back to Home</Link>
      </div>
    </section>
  );
}
