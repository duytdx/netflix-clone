import React from "react";

function Head({ title }) {
  return (
    <div className="w-full bg-deepGray lg:h-80 h-64 relative overflow-hidden">
      {/* Hình ảnh nền */}
      <img
        src="/images/head.jpg"
        alt="aboutus"
        className="w-full h-full object-cover"
      />
      {/* Tiêu đề */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="lg:text-6xl text-4xl font-bold text-white">{title}</h1>
      </div>
    </div>
  );
}

export default Head;