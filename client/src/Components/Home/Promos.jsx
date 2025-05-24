import React from "react";
import { FiUser } from "react-icons/fi";

function Promos() {
  return (
    <div className="my-20 py-10 md:px-20 px-8 bg-dry">
      <div className="lg:grid lg:grid-cols-2 lg:gap-10 items-center">
        <div className="flex lg:gap-10 gap-6 flex-col">
          <h1 className="xl:text-3xl text-xl capitalize font-sans font-medium leading-relaxed">
            Download Your Movies & Watch Offline <br /> Enjoy on Your Mobile
          </h1>
          <p className="text-text text-sm xl:text-base leading-6 xl:leading-8 ">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius ab
            excepturi dolorum blanditiis sit aspernatur in numquam nobis esse
            architecto, fuga cum iste eos nesciunt totam quae repellendus
            impedit. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Eius ab excepturi dolorum blanditiis sit aspernatur in numquam nobis
            esse architecto.
          </p>
          <div className="flex gap-4 md:text-lg text-sm">
            <div className="flex items-center justify-center bg-black text-red-500 px-6 py-3 rounded font-bold">
              HD 4K
            </div>
            <div className="flex items-center gap-2 bg-black text-red-500 px-6 py-3 rounded font-bold">
              <FiUser className="w-5 h-5" />
              2K
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <img
            src="/images/mobile.png"
            alt="phone"
            className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Promos;
