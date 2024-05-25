import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logoImg from "./Images/logoLite.png";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({
      ...user,
      [name]: value,
    }));
  };

  const submitData = (e) => {
    e.preventDefault();
    loginUser();
    setUser({
      email: "",
      password: "",
    });
  };

  const loginUser = async () => {
    await axios
      .post("/api/login", user)
      .then((res) => {
        localStorage.setItem("authToken", res.data.token);
        toast.success(res.data.message);
        return navigate(`/profile/${res.data.user._id}`);
      })
      .catch((error) => {
        if (error.response.data.error == "No user found") {
          toast.error("Please first register your self");
          return navigate("/register");
        }
        if (error.response.data.error)
          return toast.error(error.response.data.error);
      });
  };

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

        <div className="flex justify-center mt-[15%] md:mt-[8%]">
          <div className=" w-[85%] md:w-[25%] p-3 rounded-[15px] shadow-[0px_0px_20px_-7px_black] bg-white">
            <p className="text-center font-[500] text-[19px]">
              Login to <span className="text-red-600 font-[700]">Note</span>
              <span className="text-zinc-950 font-[700]">Master</span>
            </p>
            <p className="text-[14px] text-gray-400">
              Welcome back! Please log in to continue...
            </p>
            <form onSubmit={submitData} className="mt-2 md:px-2">
              <label htmlFor="" className="">
                Email Id :
              </label>
              <input
                type="text"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="enter your email"
                className="border-2 border-slate-300 rounded-[15px] w-[100%] py-1.5 px-3 mt-1 mb-3"
              />
              <label htmlFor="">Password : </label>
              <input
                type="text"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="enter your password"
                className="border-2 border-slate-300 rounded-[15px] w-[100%] py-1.5 px-3 mt-1 mb-4"
              />
              <div className="w-[100%] flex justify-center">
                <button
                  type="submit"
                  className="w-[50%] text-center bg-red-600 hover:bg-red-700 px-4 py-2 text-white font-[500] rounded-[10px]"
                >
                  Login
                </button>
              </div>
            </form>
            <p className="mt-3 text-slate-400 text-[12px] mb-2">
              At NoteMaster, we are committed to protecting your personal
              information. Your privacy and security are our top priorities.
            </p>
            <hr />
            <p className="text-center m-2 text-gray-500 text-[15px]">
              Not on NoteMaster yet?{" "}
              <NavLink
                to={"/register"}
                className="text-red-600 font-[500] underline"
              >
                Sign up
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
