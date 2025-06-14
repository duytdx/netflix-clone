import React from "react";
import { FaCloudDownloadAlt, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { GoEye } from "react-icons/go";

const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";
const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3";

const Rows = (movie, index, admin) => {
  return (
    <tr key={index}>
      <td className={`${Text}`}>
        <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
          <img
            src={movie?.image ? movie?.image : "/images/user.png"}
            alt={movie?.name}
            className="w-full h-full object-cover"
          />
        </div>
      </td>
      <td className={`${Text}`}>{movie.name}</td>
      <td className={`${Text}`}>{movie.category}</td>
      <td className={`${Text}`}>{movie.language}</td>
      <td className={`${Text}`}>{movie.year}</td>
      <td className={`${Text}`}>{movie.time}hr</td>
      <td className={`${Text} float-right flex gap-2`}>
        {admin ? (
          <>
            <button className="border border-border bg-dry cursor-pointer flex items-center gap-2 text-border rounded py-1 px-2">
              Edit <FaEdit className="text-green-500" />
            </button>
            <button className="bg-subMain cursor-pointer text-white rounded flex items-center justify-center w-8 h-8">
              <MdDelete />
            </button>
          </>
        ) : (
          <>
            <button className="border border-border bg-dry flex items-center gap-2 text-border rounded py-1 px-2 cursor-pointer">
              Download <FaCloudDownloadAlt className="text-green-500" />
            </button>
            <Link
              to={`/movies/${movie?._id}`}
              className="bg-subMain text-white rounded flex items-center justify-center w-8 h-8"
            >
              <GoEye />
            </Link>
          </>
        )}
      </td>
    </tr>
  );
};

function Table({ data, admin }) {
  return (
    <div className="overflow-x-scroll overflow-hidden relative w-full">
      <table className="w-full table-auto border border-border divide-y divide-border">
        <thead>
          <tr className="bg-dryGray">
            <th scope="col" className={`${Head}`}>
              Image
            </th>
            <th scope="col" className={`${Head}`}>
              Name
            </th>
            <th scope="col" className={`${Head}`}>
              Category
            </th>
            <th scope="col" className={`${Head}`}>
              Language
            </th>
            <th scope="col" className={`${Head}`}>
              Year
            </th>
            <th scope="col" className={`${Head}`}>
              Hours
            </th>
            <th scope="col" className={`${Head}`}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          {data.map((movie, index) => Rows(movie, index, admin))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;