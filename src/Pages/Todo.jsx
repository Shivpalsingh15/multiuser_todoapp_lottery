import React from "react";
import Navbar from "../Components/Navbar";
import Mytodo from "../Components/Mytodo";
import { useContext } from "react";
import { AppContext } from "../Contextapi";
function Todo(props) {
  let myappState = useContext(AppContext);
  const { userInfo } = myappState;
  return (
    <>
      <Navbar />
      <Mytodo />
    </>
  );
}

export default Todo;
