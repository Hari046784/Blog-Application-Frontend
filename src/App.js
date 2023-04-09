import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Blogs from "./Components/Blogs";
import Auth from "./Components/Auth";
import UserBlogs from "./Components/UserBlogs";
import BlogDetail from "./Components/BlogDetails";
import AddBlog from "./Components/AddBlog";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {!isLoggedIn ? (
          <Route path="/" element={<Auth />} />
        ) : (
          <>
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/myBlogs" element={<UserBlogs />} />
            <Route path="/myBlogs/:id" element={<BlogDetail />} />
            <Route path="/blogs/add" element={<AddBlog />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
