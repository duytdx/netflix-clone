import React from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaHeart, FaListAlt, FaUsers } from "react-icons/fa";
import {
  RiLockPasswordLine,
  RiVideoAddFill,
} from "react-icons/ri";
import { HiViewGridAdd } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
import Layout from "../../Layout/Layout";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../Redux/Actions/userActions";
import { toast } from "react-toastify";
import { RiLogoutCircleLine } from "react-icons/ri";

function SideBar({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.userLogin);

  // logout user
  const logoutHandler = () => {
    dispatch(logoutAction());
    navigate("/login");
    toast.success("Logged out successfully");
  }

  const SideLinks = userInfo?.isAdmin ? [
    { name: "Dashboard", link: "/dashboard", icon: BsFillGridFill },
    { name: "Movies List", link: "/movieslist", icon: FaListAlt },
    { name: "Add Movie", link: "/addmovie", icon: RiVideoAddFill },
    { name: "Categories", link: "/categories", icon: HiViewGridAdd },
    { name: "Users", link: "/users", icon: FaUsers },
    { name: "Update Profile", link: "/profile", icon: FiSettings },
    { name: "Favorites Movies", link: "/favorites", icon: FaHeart },
    { name: "Change Password", link: "/password", icon: RiLockPasswordLine },
  ]
    : userInfo ? [
      { name: "Update Profile", link: "/profile", icon: FiSettings },
      { name: "Favorites Movies", link: "/favorites", icon: FaHeart },
      { name: "Change Password", link: "/password", icon: RiLockPasswordLine },
    ]
      : [];


  const active = "bg-dryGray text-red-500";
  const hover = "hover:text-white hover:bg-main";
  const inActive =
    "rounded font-medium text-sm transition flex gap-3 items-center p-4";
  const Hover = ({ isActive }) =>
    isActive ? `${active} ${inActive}` : `${hover} ${inActive}`;

  return (
    <Layout>
      <div className="min-h-screen container mx-auto px-2">
        <div className="xl:grid grid-cols-8 gap-10 items-start md:py-20 py-6">
          <div className="col-span-2 sticky bg-dry border border-gray-800 rounded-md xl:mb-0 mb-5">
            {/* SideBar Links */}
            {SideLinks.map((link, index) => (
              <NavLink to={link.link} key={index} className={Hover}>
                <link.icon /> <p>{link.name}</p>
              </NavLink>
            ))}
            <button onClick={logoutHandler} className={`${inActive} ${hover} w-full`}>
              <RiLogoutCircleLine />Logout
            </button>
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="10"
            data-aos-offset="200"
            className="col-span-6 rounded bg-dry border border-gray-800 p-6"
          >
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SideBar;
