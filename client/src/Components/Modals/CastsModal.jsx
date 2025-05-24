import MainModal from "./MainModal";
import React from "react";
import { Input } from "../UsedInputs";
import Uploader from "../Uploader";

function CastsModal({ modalOpen, setModalOpen, cast }) {
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="text-2xl font-bold text-white mb-6">
        {cast ? "Update Cast" : "Add New Cast"}
      </div>

      <form className="flex flex-col gap-5">
        <Input
          label="Cast Name"
          defaultValue={cast?.fullName}
          placeholder="e.g., John Doe"
          type="text"
          bg={true}
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-400">
            Upload Image
          </label>
          <Uploader />
          <div className="w-28 h-28 rounded-lg overflow-hidden border border-gray-600 mt-2">
            <img
              src={`/images/${cast?.image || "user.png"}`}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <button
          onClick={() => setModalOpen(false)}
          className="mt-4 w-full py-3 rounded-lg bg-[#e50914] hover:bg-red-700 text-white font-semibold transition"
        >
          {cast ? "Update" : "Add Cast"}
        </button>
      </form>
    </MainModal>
  );
}

export default CastsModal;
