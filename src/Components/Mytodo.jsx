import axios from "axios";
import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import { AppContext } from "../Contextapi";
import img from "../assets/todobg.jpg";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import styles from "./btn2.module.css";
import toast, { Toaster } from "react-hot-toast";

export default function Mytodo() {
  let myappState = useContext(AppContext);
  const { userInfo } = myappState;
  const [task, setTask] = React.useState("");
  const [loader, setloader] = React.useState(false);
  const [allTask, setAllTask] = React.useState([]);
  const handleChange = (e) => {
    setTask(e.target.value);
    // console.log("chage evrnt is tigered...", e.target.value);
  };

  const handleClick = async () => {
    try {
      setloader(true);
      await axios.post("https://jsonserverbackend-le6r.onrender.com/todos", {
        newTask: task.trim(),
        userid: userInfo.userid,
        isDone: false,
      });
      setloader(false);
    } catch (error) {
      setloader(false);
      toast.error(error.message, { duration: 3000 });

      console.log("error: in mytodo", error);
    }
    getAlltodo();
    setTask("");
  };
  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `https://jsonserverbackend-le6r.onrender.com/todos/${id}`
      );
      console.log("delte task:", response.data);
      toast.success("task deleted", { duration: 3000 });
    } catch (error) {
      console.log("Error toggling task status:", error);
      toast.error(error.message, { duration: 3000 });
    }
    await getAlltodo();
  };
  const togglestatus = async (id, status) => {
    try {
      const response = await axios.patch(
        `https://jsonserverbackend-le6r.onrender.com/todos/${id}`,
        {
          isDone: !status,
        }
      );
      console.log("Updated task:", response.data);
    } catch (error) {
      console.log("Error toggling task status:", error);
    }
    await getAlltodo();
  };

  async function getAlltodo() {
    try {
      let response = await axios.get(
        `https://jsonserverbackend-le6r.onrender.com/todos?userid=${userInfo.userid}`
      );
      setAllTask(response.data);
    } catch (error) {
      console.log("error in getAlltodo:", error);
    }
  }
  useEffect(() => {
    getAlltodo();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="my-4 text-green-800 text-xl">
        Welcome , <span>{userInfo?.username.toUpperCase()}</span>
      </h2>
      <div className="border border-black w-[40%] rounded-lg p-3  gap-4 flex flex-col justify-center items-center">
        <input
          type="text"
          placeholder="MENTION YOUR TODOS ...... "
          onChange={handleChange}
          value={task}
          className="p-1 w-full bg-transparent"
        />
        <button
          id="addbtn"
          disabled={task.trim() ? false : true}
          onClick={handleClick}
          className={styles.BTN2}
        >
          {loader ? "Loading.... " : "Add Task"}
        </button>
      </div>
      {/* // mapping here */}
      {!allTask.length ? (
        <h2 className="italic text-4xl text-green-700 mt-10 font-extrabold">
          No task to show
        </h2>
      ) : (
        <table className="font-serif mt-[2%] w-[50%] ">
          <thead className="p-2 border bg-lime-300">
            <tr className="text-center">
              <th>Sr. no.</th>
              <th>Task Name</th>
              <th>Status</th>
              <th>Toggle</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="text-center	p-2 bg-lime-100 ">
            {allTask.map((obj, index) => (
              <tr className="text-center" key={obj.id}>
                <td>{index + 1}</td>
                <td>{obj.newTask}</td>
                <td>
                  <p>
                    <span style={{ color: !obj.isDone ? "black" : "green" }}>
                      {" "}
                      {!obj.isDone ? "Pending" : "Completed"}
                    </span>
                  </p>
                </td>
                <td
                  className="cursor-pointer"
                  onClick={() => togglestatus(obj.id, obj.isDone)}
                >
                  <p className="flex justify-center items-center">
                    {" "}
                    {obj.isDone ? (
                      <FaToggleOn size={20} />
                    ) : (
                      <FaToggleOff size={20} />
                    )}
                  </p>
                </td>
                <td
                  className="cursor-pointer"
                  onClick={() => deleteTask(obj.id)}
                >
                  <p className="flex justify-center items-center">
                    <MdDeleteOutline size={24} />
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Toaster />
    </div>
  );
}
