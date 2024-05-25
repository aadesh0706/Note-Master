import axios from "axios";
import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import logoImg from "./Images/logoLite.png";
import toast from "react-hot-toast";

const Registration = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const submitData = (e) => {
    e.preventDefault();
    createUser();
    setUser({
      fullName: "",
      email: "",
      password: "",
    });
  };

  const createUser = async () => {
    try {
      const res = await axios.post("/api/register", user);

      localStorage.setItem("authToken", res.data.token);

      toast.success(res.data.message, { position: "top-center" });

      navigate(`/profile/${res.data.user._id}`);
    } catch (error) {
      toast.error(error.response.data.error);
    }
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
              Register for <span className="text-red-600 font-[700]">Note</span>
              <span className="text-zinc-950 font-[700]">Master</span>
            </p>
            <p className="text-[14px] text-gray-400">
              Effortlessly organize your notes with NoteMaster!
            </p>
            <form onSubmit={submitData} className="mt-2 md:px-2">
              <label htmlFor="" className="">
                Full Name :
              </label>
              <input
                type="text"
                name="fullName"
                value={user.fullName}
                onChange={handleChange}
                placeholder="enter your name"
                className="border-2 border-slate-300 rounded-[15px] w-[100%] py-1.5 px-3 mt-1 mb-3"
              />
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
                  Register
                </button>
              </div>
            </form>
            <p className="mt-3 text-slate-400 text-[12px] mb-2">
              By registering with NoteMaster, you're taking the first step
              towards efficient note-taking. We understand the importance of
              your privacy and security.
            </p>
            <hr />
            <p className="text-center m-2 text-gray-500 text-[15px]">
              Already a member?{" "}
              <NavLink
                to={"/login"}
                className="text-red-600 font-[500] underline"
              >
                Log in
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;

// useEffect(() => {
//     const getData = async () => {
//       const token =
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NGVlYmUyZWU3ODIxMmNkY2NmYjEzNyIsImlhdCI6MTcxNjQ0ODMwOCwiZXhwIjoxNzE2NDUxOTA4fQ.vj14MuZZGW36Z0QjcKU-DFwEOnr3gtNOzIc0Dzy0Lbc";
//       axios
//         .post(
//           "/api/createTodo/664eebe2ee78212cdccfb137",
//           { title: "node js", description: "the runtime env" },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         )
//         .then((res) => {
//           console.log(res);
//         })
//         .catch((error) => {
//           console.log(error.response.data.error);
//         });
//     };
//     getData();
//   }, []);
