import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Registration from "./Components/Registration";
import Profile from "./Components/Profile";
import AddTodo from "./Components/CreateNote";
import UpdateNote from "./Components/UpdateNote";
import ErrorPage from "./Components/ErrorPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/profile/:userId" element={<Profile />} />
      <Route path="/profile/addTodo/:userId" element={<AddTodo />} />
      <Route path="/profile/updateNote/:noteId" element={<UpdateNote />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;

/*

1) create user api 
await axios.post("/api/register", { 
          fullName: "Vaibhav Shinde",
          email: "vaibhav@gmail.com",
          password: "vaibhu@123",
        })
        .then((res) => {
          console.log(res.data); // user created successful message
          // {message: 'User created successfully', token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2N…DQxfQ.jeP8XYVJnyS5yzrlU-_4_r6L_SF3v-t4Kl5xl6LpaKs', user: {…}}
          console.log(res.data.user); // user created object
          // {fullName: 'Vaibhav Shinde', email: 'vaibhav@gmail.com', password: '$2b$10$3iEtqLiyuie5uouSh.Itne5Y4xJ/vqxK9Pce9ORkvIHSMzAbitwiq', todos: Array(0), _id: '664ed6d9769fadd3fc95f80f', …}
        }).catch((error)=>{
          console.log(error.response.data.error)  // server error message
        });

 2) login user api
 await axios.post("/api/login", {
          email: "vaibhav@gmail.com",
          password: "vaibhu@123",
        })
        .then((res) => {
          console.log(res.data.message); // user login successful message
          console.log(res.data.user); // loged in user object
        }).catch((error)=>{
          console.log(error.response.data.error) // error message user not found, invalid email or pass
        });
*/
