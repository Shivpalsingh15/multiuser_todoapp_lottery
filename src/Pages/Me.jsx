import React from "react";
import Navbar from "../Components/Navbar";
import { motion } from "framer-motion";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import img from "../assets/resume.png";
function Me(props) {
  return (
    <div>
      <Navbar />
      {/* <div class="wrapper one">
        <div class="drop-main">
          <div class="w">W</div>
          <div class="e">E</div>
          <div class="l">L</div>
          <div class="c">C</div>
          <div class="o">O</div>
          <div class="m">M</div>
          <div class="e">E</div>
          <div class="s">!</div>
        </div>
      </div> */}
      {/* <div>
        <div
          id="Intro"
          className="text-center bg-black text-white p-2 hover:border-blue-400"
        >
          <p>
            I'm a final year student pursuing Computer Science from Govt. Holkar
            Science College, Indore.
          </p>
          <p>
            I'm excited to learn new technologies and always curious about how
            the web and websites work.
          </p>
        </div>
      </div> */}

      <div className="flex flex-col justify-center items-center">
        <div>
          <p className="italic font-Georgia text-4xl text-orange-600 my-5">
            Shivpal welcomes you...
          </p>
        </div>
        <div className="p-5  px-10 w-[50%] border border-black rounded-lg flex justify-between">
          <div>
            <h2 className="italic font-Georgia text-2xl text-green-800 my-5 font-bold">
              Tech Stacks
            </h2>
            <div className="text-amber-900 font-extrabold">
              <li>ReactJS</li>
              <li>Tailwind CSS</li>
              <li>React-router-dom</li>
              <li>React-icons</li>
              <li>React-hot-toast</li>
              <li>Json-server</li>
              <li>Axios</li>
            </div>
          </div>
          <div>
            <h2 className="italic font-Georgia text-2xl text-green-800 my-5 font-bold">
              About this Project
            </h2>
            <div className="text-amber-900 font-extrabold">
              <li>Login & Logout functionality</li>
              <li>Form Validations</li>
              <li>User Relationalship</li>
              <li>Error Handling's & Toaster</li>
              <li>Conditional Rendering</li>
              <li>Routes, Private routes & Dynamic Routing</li>
              <li>Json-server used as Backend</li>
              <li>Axios for api requests</li>
              <li>State management & Local storage</li>
            </div>
          </div>
        </div>
        <div className="w-[20%]  mt-12 flex justify-around items-center p-3 ">
          <div>
            <a href="https://www.linkedin.com/in/singhshivpal/" target="_blank">
              <IoLogoLinkedin size={20} />
            </a>
          </div>
          <div>
            <a href="https://github.com/Shivpalsingh15" target="_blank">
              <FaGithub size={20} />
            </a>
          </div>
          <div>
            <a
              href="https://www.instagram.com/_singhshivpal07/"
              target="_blank"
            >
              <FaInstagram size={20} />
            </a>
          </div>
          <div>
            <a
              href="https://drive.google.com/file/d/10jtYaZaaVg3uXXIp3AAiNL8I4cBB-ggD/view?usp=sharing"
              target="_blank"
            >
              <img width={"20px"} src={img} alt="resume" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Me;

// This website is a showcase of my skills in web development. It's
// built using ReactJS and Tailwind CSS, utilizing various packages
// for routing, icons, notifications, and data fetching. The
// backend is powered by Json-server, and Axios is used for
// handling HTTP requests.

// <li>ReactJS</li>
// <li>Tailwind CSS</li>
// <ul className="list-disc ml-6">
//   <li>React-router-dom</li>
//   <li>React-icons</li>
//   <li>React-hot-toast</li>
//   <li>Json-server</li>
//   <li>Axios</li>
// </ul>

//               I'm a final year student pursuing Computer Science from Govt.
//               Holkar Science College, Indore.
//             </p>
//             <p className="mb-4">
//               I'm excited to learn new technologies and always curious about how
//               the web and websites work.
