import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import AllTodo from "./Pages/AllTodo";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { useEffect, useState } from "react";
import MyProfile from "./Pages/MyProfile";

function App() {
  const [user, setUser] = useState();

  const getUser = async () => {
    const res = await JSON.parse(localStorage.getItem("userInfo"));
    res ? setUser(res.userDetails) : setUser(null);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (user === undefined) {
    return <> loading.....</>;
  }

  return (
    <Routes>
      <Route path="/" element={<Home user={user} />} />

      {user ? (
        <Route path="/register" element={<Navigate to="/" />} />
      ) : (
        <Route path="/register" element={<Register />} />
      )}

      {user ? (
        <Route path="/login" element={<Navigate to="/" />} />
      ) : (
        <Route path="/login" element={<Login />} />
      )}

      {!user ? (
        <Route path="/alltodo" element={<Navigate to="/login" />} />
      ) : (
        <Route
          path="/alltodo"
          element={<AllTodo id={user.user._id} count={false} />}
        />
      )}

      {user ? (
        <Route path="/myprofile" element={<MyProfile />} />
      ) : (
        <Route path="/myprofile" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
}

export default App;
