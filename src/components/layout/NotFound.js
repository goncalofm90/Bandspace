import React from "react";
import { Link } from "react-router-dom";

const NotFound = (props) => {
  return (
    <div>
      <h1 className="x-large text-primary">Oops!</h1>
      <p className="lead">
        <i class="fas fa-bomb"></i> It seems the page you're looking for does
        not exist.
      </p>
      <Link to="/" className="btn btn-profile">
        Back
      </Link>
    </div>
  );
};

export default NotFound;
