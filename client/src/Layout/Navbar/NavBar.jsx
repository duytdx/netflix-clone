import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaSearch, FaUser, FaHeart, FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";

function NavBar() {
  const { userInfo } = useSelector((state) => state.userLogin);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const hover = "hover:text-red-500 transitions text-white";
  const Hover = ({ isActive }) => (isActive ? "text-subMain" : hover);

  return (
    <div className="bg-main shadow-md sticky top-0 z-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4 lg:py-6">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/images/logo.png"
              alt="logo"
              className="h-10 lg:h-12 object-contain"
            />
          </Link>

          {/* Search Bar - Hidden on Mobile */}
          <div className="hidden md:flex flex-1 mx-8">
            <form className="w-full max-w-2xl relative">
              <input
                type="text"
                placeholder="Search Movie Name from here"
                className="w-full px-12 py-2 text-sm bg-dryGray text-border rounded-md focus:outline-none focus:ring-1 focus:ring-subMain"
              />
              <button
                type="submit"
                className="absolute left-0 top-0 h-full w-12 flex items-center justify-center bg-subMain rounded-l-md"
              >
                <FaSearch className="text-white" />
              </button>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <NavLink to="/movies" className={Hover}>
              Movies
            </NavLink>
            <NavLink to="/about-us" className={Hover}>
              About Us
            </NavLink>
            <NavLink to="/contact-us" className={Hover}>
              Contact Us
            </NavLink>

            {/* User Icons */}
            <div className="flex items-center gap-4">
              <NavLink to={
                userInfo?.isAdmin ? "/dashboard" : userInfo ? "/profile" : "/login"
              } className="text-white hover:text-subMain transitions">
                <FaUser className="text-xl" />
              </NavLink>
              <div className="relative">
                <NavLink to="/favorites" className="text-white hover:text-subMain transitions">
                  <FaHeart className="text-xl" />
                </NavLink>
                <span className="absolute -top-2 -right-2 bg-subMain text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  3
                </span>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2"
          >
            <FaBars className="text-2xl" />
          </button>
        </div>

        {/* Mobile Search - Visible on Mobile Only */}
        <div className="md:hidden py-4">
          <form className="relative">
            <input
              type="text"
              placeholder="Search Movie Name from here"
              className="w-full px-12 py-2 text-sm bg-dryGray text-border rounded-md focus:outline-none focus:ring-1 focus:ring-subMain"
            />
            <button
              type="submit"
              className="absolute left-0 top-0 h-full w-12 flex items-center justify-center bg-subMain rounded-l-md"
            >
              <FaSearch className="text-white" />
            </button>
          </form>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} py-4 border-t border-gray-800`}>
          <div className="flex flex-col gap-4">
            <NavLink to="/movies" className={Hover}>
              Movies
            </NavLink>
            <NavLink to="/about-us" className={Hover}>
              About Us
            </NavLink>
            <NavLink to="/contact-us" className={Hover}>
              Contact Us
            </NavLink>
            <div className="flex gap-4 pt-4">
              <NavLink to="/login" className="text-white hover:text-subMain transitions">
                <FaUser className="text-xl" />
              </NavLink>
              <div className="relative">
                <NavLink to="/favorites" className="text-white hover:text-subMain transitions">
                  <FaHeart className="text-xl" />
                </NavLink>
                <span className="absolute -top-2 -right-2 bg-subMain text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  3
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
