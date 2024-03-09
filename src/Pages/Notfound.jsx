import React from "react";
import img from "../assets/notfound.jpg";
import { Link } from "react-router-dom";
function Notfound(props) {
  return (
    <Link to="/">
      <div
        style={{ backgroundImage: `url(${img})` }}
        className={`bg-no-repeat bg-cover bg-center h-screen `}
      ></div>
    </Link>
  );
}

export default Notfound;
