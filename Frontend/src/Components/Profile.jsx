import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import logoImg from "./Images/logoLite.png";
import toast from "react-hot-toast";
import { formatDistanceToNow, parseISO } from "date-fns";

const Profile = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  const checkAutherisedUser = async () => {
    const token = localStorage.getItem("authToken");
    await axios
      .get("/api/authenticateUser", {
        params: {
          param: param.userId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        navigate("/login");
      });
  };

  const getNotes = async () => {
    await axios
      .get(`/api/notes/${param.userId}`)
      .then((res) => {
        setNotes(res.data);
      })
      .catch((error) => {
        if (error.response.data.error == "No todos found") {
          navigate(`/profile/addTodo/${param.userId}`);
        }
      });
  };

  useEffect(() => {
    checkAutherisedUser();
    getNotes();
  });

  const changeStatus = async (id) => {
    await axios
      .get(`/api/note/${id}`)
      .then((res) => {
        let newObj = { ...res.data.note, status: !res.data.note.status };
        axios
          .put(`/api/update/note/${newObj._id}`, newObj)
          .then((res) => {
            if (newObj.status) {
              toast.success("Task is Completed");
            } else {
              toast.error("Task is pending");
            }
            return navigate(`/profile/${newObj.writer}`);
          })
          .catch((error) => {
            console.log(error.response);
          });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const deleteNote = async (id) => {
    await axios.delete(`/api/delete/note/${id}`).then((res) => {
      toast.error(res.data.message);
    });
    setNotes((prev) => prev.filter((e) => e._id != id));
  };

  const logout = () => {
    const tempToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjUxN2ZjZGE1M2JmYWMzNjFjMDc2NWUiLCJpYXQiOjE3MTY2MTcxNjUsImV4cCI6MTcxNjYyMDc2NX0.jtCJAseug7tdwvB6uEnYTjZLULL0SuMp33uQhwh7zMI";
    localStorage.setItem("authToken", tempToken);
  };

  const getdate = (date) => {
    return formatDistanceToNow(parseISO(date), { addSuffix: true });
  };

  return (
    <>
      <div className="flex flex-col w-[100%]  font-poppins">
        <div className="w-[100%] flex justify-around p-3 md:p-5 bg-slate-100 mb-10">
          <div className="flex md:justify-center w-[40%] md:w-[50%]">
            <img src={logoImg} alt="logo" className="w-[100%] md:w-[200px]" />
          </div>
          <div className=" w-[60%] md:w-[50%] flex gap-2 md:gap-10 justify-center items-center">
            <NavLink
              to={`/profile/addTodo/${param.userId}`}
              className="bg-blue-600 hover:bg-blue-700 md:px-4 px-3 py-2 text-white font-[500] rounded-[10px]"
            >
              Add Note
            </NavLink>
            <NavLink
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 md:px-4 px-3 py-2 text-white font-[500] rounded-[10px]"
            >
              LogOut
            </NavLink>
          </div>
        </div>

        {notes.map((note) => (
          <div
            key={note._id}
            className="flex justify-center mt-[10px] md:mt-[10px] mb-3"
          >
            <div className=" w-[90%] md:w-[35%] p-3 rounded-[15px] shadow-[0px_0px_20px_-7px_black] bg-white">
              <p>
                <span className="font-[500] text-[17px]">Title : </span>
                {note.title}
              </p>
              <p className="font-[400]">
                <span className="font-[500] text-[17px]">Description : </span>
                {note.description}
              </p>
              <div className="flex mt-3 justify-between">
                <p className="p-1 text-slate-400 ">{getdate(note.updatedAt)}</p>
                <div className="flex md:gap-3 gap-2 items-center justify-end">
                  {note.status ? (
                    <NavLink
                      onClick={() => changeStatus(note._id)}
                      className="flex bg-green-500 hover:bg-green-700  px-4 py-2 text-white font-[500] rounded-[10px]"
                    >
                      <span className="material-symbols-outlined">
                        check_circle
                      </span>
                    </NavLink>
                  ) : (
                    <NavLink
                      onClick={() => changeStatus(note._id)}
                      className="flex bg-yellow-600 hover:bg-yellow-700 md:px-4 px-4 py-2 text-white font-[500] rounded-[10px]"
                    >
                      <span className="material-symbols-outlined">
                        hourglass
                      </span>
                    </NavLink>
                  )}
                  <NavLink
                    to={`/profile/updateNote/${note._id}`}
                    className="flex bg-blue-600 hover:bg-blue-700 md:px-4 px-4 py-2 text-white font-[500] rounded-[10px]"
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </NavLink>
                  <NavLink
                    onClick={() => deleteNote(note._id)}
                    className="flex bg-red-600 hover:bg-red-700 md:px-4 px-4 py-2 text-white font-[500] rounded-[10px]"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Profile;
