import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import img from "../assets/bg.jpg";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isValid, setIsValid] = useState(false);
  const [showpsd, setshowpsd] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

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
  const handlepsd = () => {
    setshowpsd(!showpsd);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const alluser = await axios.get("https://jsonserverbackend-le6r.onrender.com/users");
      console.log("alluser:", alluser);
      const alreadyExists = alluser.data.some(
        (user) => user.email === formData.email
      );
      console.log("alreadyExists:", alreadyExists);
      if (alreadyExists) {
        toast.error("User Already Registered, Please Login.");
        navigate("/login");
        return;
      }
      const response = await axios.post(
        "https://jsonserverbackend-le6r.onrender.com/users",
        formData
      );
      console.log("New user created:", response.data);
      toast.success("User registered");
      navigate("/login");
      // Optionally, redirect to another page after successful registration
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error(error.message);
    }
    setFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  const { username, email, password } = formData;

  // Regular expressions for email and password validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]{8,}$/;

  const isValidEmail = (email) => emailRegex.test(email);
  const isValidPassword = (password) => passwordRegex.test(password);

  // Check if all fields are filled and valid
  const validateForm = () => {
    setIsValid(
      username.trim() !== "" && isValidEmail(email) && isValidPassword(password)
    );
  };

  // Call validateForm whenever formData changes
  React.useEffect(() => {
    validateForm();
  }, [formData]);

  return (
    <>
      <Toaster />
      <div
        style={{ backgroundImage: `url(${img})` }}
        className={`bg-no-repeat bg-cover bg-center h-screen border border-black flex justify-center items-center`}
      >
        <form
          onSubmit={handleSubmit}
          className="p-6 w-[40%]  rounded-lg text-white bg-gradient-to-r from-red-700 to-fuchsia-700"
        >
          <h1 className="text-yellow-500 text-[24px] mb-4">
            Welcome to Register{" "}
            {/* <span className="ml-10 text-white text-[20px]">Register Here</span>{" "} */}
          </h1>

          <div className="p-1 mb-2 hover:border border-black hover:rounded-md">
            <label
              htmlFor="username"
              className="block text-white text-sm font-medium outline-none focus:outline-none"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleChange}
              className="bg-transparent form-input mt-1 block w-full focus:outline-none text-sm pl-1"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="p-1 mb-2 hover:border border-black hover:rounded-md">
            <label htmlFor="email" className="block text-white text-sm">
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
            Register
          </button>
          <p>
            Already have an account? <Link to="/login">Login</Link>{" "}
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
