import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = () => {
    console.log("logout:");
    toast.success("Thanks for visiting 😊", { duration: 3000 });
    localStorage.removeItem("userDetails");
    navigate("/login");
  };
  return (
    <nav className="bg-green-200 p-2 flex justify-between font-mono text-xl">
      <Link  to='/me' > Me</Link>
      <div className="flex justify-center items-center">
        <Link to={location.pathname == "/lottery" ? "/" : "/lottery"}>
          {location.pathname == "/lottery" ? "Tasks" : "Play"}
        </Link>
        <button onClick={logout} className="ml-6">
          <RiLogoutCircleLine color="red" size={24} />
        </button>
      </div>
      <Toaster />
    </nav>
  );
};

export default Navbar;
