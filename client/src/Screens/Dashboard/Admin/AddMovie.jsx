import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import Uploader from "../../../Components/Uploader";
import { Input, Message, Select } from "../../../Components/UsedInputs";
import { CategoriesData } from "../../../Data/CateporiesData";
import { UsersData } from "../../../Data/UsersData";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { ImUpload } from "react-icons/im";
import CastsModal from "../../../Components/Modals/CastsModal";

function AddMovie() {
  const [modalOpen, setModalOpen] = useState(false);
  const [cast, setCast] = useState(null);

  useEffect(() => {
    if (modalOpen === false) {
      setCast();
    }
  }, [modalOpen]);

  return (
    <SideBar>
      <CastsModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        cast={cast}
      />

      <div className="max-w-6xl mx-auto p-6 bg-dry rounded-xl shadow-lg space-y-8">
        <h2 className="text-3xl font-extrabold text-white">Create Movie</h2>

        {/* Title and Hours */}
        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="Movie Title"
            placeholder="Game Of Thrones"
            type="text"
            bg={true}
          />
          <Input label="Hours" placeholder="2hr" type="text" bg={true} />
        </div>

        {/* Language and Year */}
        <div className="grid md:grid-cols-2 gap-6">
          <Input label="Language" placeholder="English" type="text" bg={true} />
          <Input
            label="Year Of Release"
            placeholder="2022"
            type="number"
            bg={true}
          />
        </div>

        {/* Images */}
        <div className="grid md:grid-cols-2 gap-6">
          {[99, 88].map((img, idx) => (
            <div key={idx} className="flex flex-col gap-3">
              <p className="text-gray-400 font-medium text-sm">
                Movie Image {idx + 1}
              </p>
              <Uploader />
              <div className="relative w-32 h-32 bg-main border border-gray-600 rounded-lg overflow-hidden shadow-md">
                <img
                  src={`/images/movies/${img}.jpg`}
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        <Message
          label="Movie Description"
          placeholder="Make it short and sweet"
        />

        {/* Category */}
        <div className="text-sm w-full">
          <Select label="Movie Category" options={CategoriesData} />
        </div>

        {/* Video Upload */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-gray-400 font-semibold text-sm">
            Movie Video
          </label>
          <Uploader />
        </div>

        {/* Cast List */}
        <div className="w-full grid lg:grid-cols-2 gap-6 items-start">
          <button
            onClick={() => setModalOpen(true)}
            className="w-full py-4 bg-main hover:bg-dry cursor-pointer border border-red-500 border-dashed text-white rounded-lg transition"
          >
            Add Cast
          </button>
          <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-4 grid-cols-2 gap-4">
            {UsersData.map((user, i) => (
              <div
                key={i}
                className="bg-main p-4 rounded-lg border border-gray-700 hover:shadow-md transition duration-300 flex flex-col items-center text-center"
              >
                <img
                  src={`/images/${user.image ? user.image : "user.png"}`}
                  alt={user.fullName}
                  className="w-full h-24 object-cover rounded mb-3"
                />
                <p className="text-white text-sm">{user.fullName}</p>
                <div className="flex gap-2 mt-2">
                  <button className="w-8 h-8 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center rounded-full">
                    <MdDelete />
                  </button>
                  <button
                    onClick={() => {
                      setCast(user);
                      setModalOpen(true);
                    }}
                    className="w-8 h-8 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center rounded-full"
                  >
                    <FaEdit />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Publish Button */}
        <button className="flex items-center justify-center gap-3 bg-[#e50914] hover:bg-red-700 transition w-full py-4 text-white font-semibold text-lg rounded-lg">
          <ImUpload /> Publish Movie
        </button>
      </div>
    </SideBar>
  );
}

export default AddMovie;
