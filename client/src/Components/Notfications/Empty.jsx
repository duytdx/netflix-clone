import React from "react";
import { FaFilm } from "react-icons/fa";

function Empty({ message }) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FaFilm className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-gray-500 text-center max-w-sm">
                {message || "There are no items to display at the moment."}
            </p>
        </div>
    );
}

export default Empty;