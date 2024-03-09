import React from "react";
import { useContext } from "react";
import { AppContext } from "../Contextapi";
import { Navigate } from "react-router-dom";
function Privateroute({ children }) {
  const mystate = useContext(AppContext);
  const { userInfo } = mystate;

  if (userInfo.uniquetoken) {
    return children;
  }
  return <Navigate to="/login" />;
}

export default Privateroute;
