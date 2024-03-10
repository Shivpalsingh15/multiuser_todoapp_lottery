import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Lottery from "../Pages/Play";
import Todo from "../Pages/Todo";
import Privateroute from "./Privateroute";
import Notfound from "../Pages/Notfound";
import Me from "../Pages/Me";
import Adminpage from "../Pages/Adminpage";

const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Privateroute>
            {" "}
            <Todo />{" "}
          </Privateroute>
        }
      ></Route>
      <Route
        path="/"
        element={
          <Privateroute>
            {" "}
            <Todo />{" "}
          </Privateroute>
        }
      ></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/*" element={<Notfound />}></Route>
      <Route
        path="/lottery"
        element={
          <Privateroute>
            {" "}
            <Lottery />{" "}
          </Privateroute>
        }
      ></Route>
      <Route
        path="/me"
        element={
          <Privateroute>
            {" "}
            <Me />{" "}
          </Privateroute>
        }
      ></Route>
    </Routes>
  );
};

export default AllRoutes;
