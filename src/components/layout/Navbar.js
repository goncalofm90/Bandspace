import React from "react";
import { Link } from "react-router-dom";
import navbarimage from "../../public/navbarimage.jpg";

const NavBar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <img
            style={{ width: "10%", height: "10%" }}
            src={navbarimage}
            alt=""
          />{" "}
          Bandspace
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="#">Musicians</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
