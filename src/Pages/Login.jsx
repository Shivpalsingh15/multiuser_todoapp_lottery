import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../Contextapi";
import img from "../assets/bg.jpg";
import toast, { Toaster } from "react-hot-toast";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
const Login = () => {
  const mystate = useContext(AppContext);
  const { setUserInfo, userInfo } = mystate;
  console.log("mystate:", mystate);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showpsd, setshowpsd] = useState(false);

  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const handlepsd = () => {
    setshowpsd(!showpsd);
  };
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.trim(), // Remove extra spaces
    }));
    // Validate fields as user types
    if (name === "email") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email:
          value !== "" && !isValidEmail(value) ? "Invalid email format" : "",
      }));
    } else if (name === "password") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password:
          value !== "" && !isValidPassword(value)
            ? "Min. 8 characters & contain alphanumric & special character"
            : "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("cliked to btn...");
    try {
      const getalluser = await axios.get(
        "https://jsonserverbackend-le6r.onrender.com/users"
      );
      console.log("getalluser:", getalluser.data);
      const { email, password } = formData;
      console.log("email, password:", email, password);
      let validentry = false;
      let isRegistered = false;
      let name = null;
      let userid = null;
      for (let i = 0; i < getalluser.data.length; i++) {
        let ele = getalluser.data[i];
        if (ele.email === email) {
          if (ele.password === password) {
            name = ele.username;
            userid = ele.id;
            validentry = true;
            break;
          } else {
            toast.error("Wrong Password, Pls check", { duration: 3000 });
            break;
          }
        } else {
          console.log("jhashjgaschjgsahjgc");
          if (i == getalluser.data.length - 1) isRegistered = true;
        }
      }
      if (isRegistered) {
        toast.error("User is not registered.", { duration: 3000 });

        console.log("User is not registered..");
      } else if (validentry) {
        let uniquetoken = "w354565@232-";
        localStorage.setItem(
          "userDetails",
          JSON.stringify({
            uniquetoken,
            email,
            password,
            username: name,
            userid,
          })
        );
        setUserInfo((prevValue) => ({
          ...prevValue,
          uniquetoken,
          email,
          password,
          username: name,
          userid,
        }));

        console.log("userInfo:", userInfo);
        console.log("user loggin in..");
        toast.success("Login Successful 🎉", { duration: 3000 });

        navigate("/");
      } else {
        toast.error("User Not Found, Please Register", { duration: 3000 });
      }
      console.log(validentry, "validentry..");
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error(error.message, { duration: 3000 });
    }
  };

  const { email, password } = formData;

  // Regular expressions for email and password validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+])(?=.*[a-zA-Z\d!@#$%^&*()_+]).{8,}$/;

  const isValidEmail = (email) => emailRegex.test(email);
  const isValidPassword = (password) => passwordRegex.test(password);

  // Check if all fields are filled and valid
  const validateForm = () => {
    setIsValid(isValidEmail(email) && isValidPassword(password));
  };

  // Call validateForm whenever formData changes
  React.useEffect(() => {
    validateForm();
  }, [formData]);
  return (
    <div
      style={{ backgroundImage: `url(${img})` }}
      className={`bg-no-repeat bg-cover bg-center h-screen border border-black flex justify-center items-center`}
    >
      <form
        className="p-6 w-[40%]  rounded-lg text-white bg-gradient-to-r from-red-700 to-fuchsia-700"
        onSubmit={handleSubmit}
      >
        <h1 className="text-yellow-500 text-[24px] mb-4">Welcome to Login</h1>
        <div className="p-1 mb-2 hover:border border-black hover:rounded-md">
          <label
            htmlFor="email"
            className="block text-white text-sm font-medium outline-none focus:outline-none"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="bg-transparent form-input mt-1 block w-full focus:outline-none text-sm pl-1"
            placeholder="Enter your email"
            required
          />
          <p className="text-black">{errors.email}</p>
        </div>
        <div className="p-1 mb-2 hover:border border-black hover:rounded-md">
          <label htmlFor="password" className="block text-white text-sm">
            Password
          </label>
          {/* <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            className="bg-transparent form-input mt-1 block w-full focus:outline-none text-sm pl-1"
            placeholder="Enter your password"
            required
          /> */}

          <div className="flex items-center">
            <input
              type={!showpsd ? "password" : "text"}
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              className=" bg-transparent form-input mt-1 block w-[70%] focus:outline-none text-sm pl-1"
              placeholder="Enter your password"
              required
            />
            <div className="" onClick={handlepsd}>
              {showpsd ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
          <p className="text-black">{errors.password}</p>
        </div>
        <button
          type="submit"
          className={`cursor-pointer py-2 px-4 w-full rounded border-2 hover:bg-black hover:text-white ${
            isValid ? "bg-green-500 text-white" : "bg-gray-300 text-white"
          }`}
          disabled={!isValid}
        >
          Login
        </button>
        <p>
          Don't have account? <Link to="/register">Register</Link>{" "}
        </p>
      </form>
      <Toaster />
    </div>
  );
};

export default Login;
