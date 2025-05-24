import React from "react";
import MainModal from "./MainModal";
import { FaFacebook, FaTelegram, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from "react-share";

function ShareMovieModal({ modalOpen, setModalOpen, movie }) {
  const shareData = [
    {
      icon: FaFacebook,
      shareButton: FacebookShareButton,
      bgColor: "hover:bg-blue-600",
      iconColor: "text-blue-600",
    },
    {
      icon: FaTwitter,
      shareButton: TwitterShareButton,
      bgColor: "hover:bg-blue-400",
      iconColor: "text-blue-400",
    },
    {
      icon: FaTelegram,
      shareButton: TelegramShareButton,
      bgColor: "hover:bg-blue-500",
      iconColor: "text-blue-500",
    },
    {
      icon: FaInstagram,
      shareButton: ({ children }) => (
        <a href={`https://www.instagram.com/share?url=${url}`} target="_blank" rel="noreferrer">
          {children}
        </a>
      ),
      bgColor: "hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500",
      iconColor: "text-pink-500",
    },
    {
      icon: FaGithub,
      shareButton: ({ children }) => (
        <a href={`https://github.com/search?q=${movie.name}`} target="_blank" rel="noreferrer">
          {children}
        </a>
      ),
      bgColor: "hover:bg-gray-800",
      iconColor: "text-gray-800",
    },
  ];
  const url = `${window.location.protocol}//${window.location.host}/movie/${movie.name}`;
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="text-2xl font-bold text-white mb-6">
        Share <span className="text-xl font-bold">{movie?.name}</span>
      </div>

      <form className="flex flex-wrap gap-6 mt-6 items-center justify-center">
        {shareData.map((data, index) => (
          <data.shareButton
            key={index}
            url={url}
            quote="Netflix | Free Movie Site"
          >
            <div className={`w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center ${data.bgColor} hover:text-white transitions cursor-pointer border border-opacity-20 border-white`}>
              <data.icon className={`w-6 h-6 ${data.iconColor} group-hover:text-white`} />
            </div>
          </data.shareButton>
        ))}
      </form>
    </MainModal>
  );
}

export default ShareMovieModal;
