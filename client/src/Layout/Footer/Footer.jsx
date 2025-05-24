import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const Links = [
    {
      title: "Company",
      links: [
        { name: "Home", link: "/" },
        { name: "About Us", link: "/about-us" },
        { name: "Contact Us", link: "/contact-us" },
        { name: "Movies", link: "/movies" },
      ],
    },
    {
      title: "Top Categories",
      links: [
        { name: "Action", link: "#" },
        { name: "Comedy", link: "#" },
        { name: "Drama", link: "#" },
        { name: "Horror", link: "#" },
      ],
    },
    {
      title: "My Account",
      links: [
        { name: "Dashboard", link: "/dashboard" },
        { name: "My Favorites", link: "/favorite" },
        { name: "Profile", link: "/profile" },
        { name: "Change Password", link: "/password" },
      ],
    },
  ];
  return (
    <div className="bg-dry py-4 border-t-2 border-black">
      <div className="container mx-auto px-10">
        <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-7 py-10 justify-between">
          {Links.map((link, index) => (
            <div
              key={index}
              className="col-span-1 md:col-span-2 lg:col-span-3 pb-3.5 sm:pb-0"
            >
              <h3 className="text-md lg:leading-7 font-medium mb-4 sm:mb-5 lg:mb-6 pb-0.5 ">
                {link.title}
              </h3>
              <ul className="text-sm">
                {link.links.map((item, index) => (
                  <li key={index} className="mb-5">
                    <Link
                      to={item.link}
                      className="text-gray-400 hover:text-red-500 duration-300 ease-in-out"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 sm:pb-0">

            <Link to="/">
              <img src="/images/logo.png" alt="logo" className="mb-5 "/>
            </Link>
            <p className="text-sm text-gray-400 mt-4 mb-5">
              <span>Tell: +84 395 099 722</span><br />
              <span>Email: dkhuong5102003@gmail.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
