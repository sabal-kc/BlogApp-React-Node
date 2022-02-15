import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { AddBlog } from "./pages/AddBlog";
import { LoginContext } from "./context/LoginContext";
import { useState } from "react";
import axios from "axios";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        setLoggedIn(false);
        localStorage.removeItem("token");
      }
      return error;
    }
  );

  return (
    <div className="App">
      <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
        <div className="main-content">
          <BrowserRouter>
            <Routes>
              <Route path="/login/" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/createPost/" element={<AddBlog />} />
              <Route path="/editPost/:id" element={<AddBlog />} />
            </Routes>
          </BrowserRouter>
        </div>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
