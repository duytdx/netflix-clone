import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import AboutUs from "./Screens/AboutUs";
import ContactUs from "./Screens/ContactUs";
import Movies from "./Screens/Movies";
import SingleMovie from "./Screens/SingleMovie";
import NotFound from "./Screens/NotFound";
import WatchPage from "./Screens/WatchPage";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Profile from "./Screens/Dashboard/Profile";
import Password from "./Screens/Dashboard/Password";
import FavoritesMovies from "./Screens/Dashboard/FavoritesMovies";
import MovieList from "./Screens/Dashboard/Admin/MovieList";
import Dashboard from "./Screens/Dashboard/Admin/Dashboard";
import Categories from "./Screens/Dashboard/Admin/Categories";
import Users from "./Screens/Dashboard/Admin/Users";
import AddMovie from "./Screens/Dashboard/Admin/AddMovie";
import ToastContainer from "./Components/Notfications/ToastContainer";
import { ProtectedRouter, AdminProtectedRouter } from "./ProtectedRouter";
import Aos from "aos";
import { useDispatch } from "react-redux";
import { getAllCategoriesAction } from "./Redux/Actions/CategoriesActions";
import { useEffect } from "react";

function App() {
  Aos.init();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategoriesAction());
  }, [dispatch]);
  return (
    <>
      <ToastContainer />
      <Routes>
        {/* **************** PUBLIC ROUTES **************** */}
        <Route path="/" element={<HomeScreen />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<SingleMovie />} />
        <Route path="/watch/:id" element={<WatchPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
        {/* **************** PRIVATE ROUTES **************** */}
        <Route element={<ProtectedRouter />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/password" element={<Password />} />
          <Route path="/favorites" element={<FavoritesMovies />} />
          {/* **************** ADMIN ROUTES **************** */}
          <Route element={<AdminProtectedRouter />}>
            <Route path="/movieslist" element={<MovieList />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/users" element={<Users />} />
            <Route path="/addmovie" element={<AddMovie />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
