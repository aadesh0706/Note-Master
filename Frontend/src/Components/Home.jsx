import React from "react";
import { NavLink } from "react-router-dom";
import logoImg from "./Images/logoLite.png";

const Home = () => {
  return (
    <>
      <div className="flex flex-col w-[100%] h-screen bg-slate-200 font-poppins">
        <div className="w-[100%] flex justify-around p-3 md:p-5 bg-slate-100">
          <div className="flex md:justify-center w-[50%]">
            <NavLink to={"/"}>
              <img
                src={logoImg}
                alt="logo"
                className="w-[150px] md:w-[200px]"
              />
            </NavLink>
          </div>
          <div className=" w-[50%] flex gap-2 md:gap-10 justify-center items-center">
            <NavLink
              to={"/login"}
              className="bg-red-600 hover:bg-red-700 md:px-4 px-3 py-2 text-white font-[500] rounded-[10px]"
            >
              Login
            </NavLink>
            <NavLink
              to={"/register"}
              className="bg-slate-700 hover:bg-slate-800 md:px-4 px-3 py-2 text-white font-[500] rounded-[10px]"
            >
              Signup
            </NavLink>
          </div>
        </div>

        <div className="flex justify-center mt-[20%] md:mt-[10%]">
          <div className=" w-[90%] md:w-[30%] p-3 rounded-[15px] shadow-[0px_0px_20px_-7px_black] bg-white">
            <p>
              <span className="font-[500] text-[17px]">Title</span> : Javascript
            </p>
            <p className="font-[400]">
              <span className="font-[500] text-[17px]">Description</span> :
              JavaScript is a high-level, versatile programming language
              primarily used for creating interactive and dynamic content on web
              pages.
            </p>
            <div className="flex mt-3 justify-between">
              <p className="p-1 text-slate-400 ">5 sec ago....</p>
              <div className="flex md:gap-3 gap-2 items-center justify-end">
                <NavLink className="flex bg-yellow-600 hover:bg-yellow-700 md:px-4 px-3 py-2 text-white font-[500] rounded-[10px]">
                  <span className="material-symbols-outlined">hourglass</span>
                </NavLink>
                <NavLink className="flex bg-blue-600 hover:bg-blue-700 md:px-4 px-3 py-2 text-white font-[500] rounded-[10px]">
                  <span className="material-symbols-outlined">edit</span>
                </NavLink>
                <NavLink className="flex bg-red-600 hover:bg-red-700 md:px-4 px-3 py-2 text-white font-[500] rounded-[10px]">
                  <span className="material-symbols-outlined">delete</span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-3">
          <div className=" w-[90%] md:w-[30%] p-3 rounded-[15px] shadow-[0px_0px_20px_-7px_black] bg-white">
            <p>
              <span className="font-[500] text-[17px]">Title</span> : Myself
            </p>
            <p className="font-[400]">
              <span className="font-[500] text-[17px]">Description</span> : My
              name is Vaibhav Shinde. I am currently pursuing a BSc in Computer
              Science and I am a software developer.
            </p>
            <div className="flex mt-3 justify-between">
              <p className="p-1 text-slate-400 ">10 min ago....</p>
              <div className="flex md:gap-3 gap-2 items-center justify-end">
                <NavLink className="flex bg-green-500 hover:bg-green-700 md:px-4 px-3 py-2 text-white font-[500] rounded-[10px]">
                  <span className="material-symbols-outlined">
                    check_circle
                  </span>
                </NavLink>
                <NavLink className="flex bg-blue-600 hover:bg-blue-700 md:px-4 px-3 py-2 text-white font-[500] rounded-[10px]">
                  <span className="material-symbols-outlined">edit</span>
                </NavLink>
                <NavLink className="flex bg-red-600 hover:bg-red-700 md:px-4 px-3 py-2 text-white font-[500] rounded-[10px]">
                  <span className="material-symbols-outlined">delete</span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
