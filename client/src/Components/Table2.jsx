import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

// Consistent styling constants
const TABLE_STYLES = {
  container: "w-full overflow-x-auto rounded-lg shadow",
  table: "w-full table-auto border border-gray-700 divide-y divide-gray-700",
  headerRow: "bg-gray-800",
  headerCell:
    "text-xs font-semibold text-gray-300 uppercase px-4 py-3 text-left",
  bodyRow: "bg-gray-900 hover:bg-gray-800 transition-colors duration-200",
  bodyCell: "px-4 py-3 text-sm text-gray-300 whitespace-nowrap",
  actionButton:
    "rounded-md transition-colors duration-200 flex items-center justify-center w-8 h-8",
  editButton:
    "flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-700 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors duration-200",
  deleteButton: "bg-red-600 hover:bg-red-700 text-white",
  imgContainer: "w-10 h-10 rounded-full overflow-hidden border border-gray-700",
  img: "w-full h-full object-cover",
};

const TableRow = ({ data, index, users, OnEditFunction, onDeleteUser, onDeleteCategory }) => {
  return (
    <tr key={index} className={TABLE_STYLES.bodyRow}>
      {users ? (
        <>
          <td className={TABLE_STYLES.bodyCell}>
            <div className={TABLE_STYLES.imgContainer}>
              <img
                src={`/images/${data.image || "user.png"}`}
                alt={data?.fullName || "User"}
                className={TABLE_STYLES.img}
              />
            </div>
          </td>
          <td className={TABLE_STYLES.bodyCell}>{data._id || "2R75T8"}</td>
          <td className={TABLE_STYLES.bodyCell}>
            {data.createAt || "12, Jan 2025"}
          </td>
          <td className={TABLE_STYLES.bodyCell}>{data.fullName}</td>
          <td className={TABLE_STYLES.bodyCell}>{data.email}</td>
          <td className={`${TABLE_STYLES.bodyCell} text-right`}>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => onDeleteUser(data._id)}
                className={`${TABLE_STYLES.actionButton} ${TABLE_STYLES.deleteButton}`}
                title="Delete User"
                aria-label="Delete User"
              >
                <MdDelete />
              </button>
            </div>
          </td>
        </>
      ) : (
        <>
          <td className={TABLE_STYLES.bodyCell}>{data?._id || "2R75T8"}</td>
          <td className={TABLE_STYLES.bodyCell}>
            {data.createAt || "12, Jan 2025"}
          </td>
          <td className={TABLE_STYLES.bodyCell}>{data.title}</td>
          <td className={`${TABLE_STYLES.bodyCell} text-right`}>
            <div className="flex justify-end gap-2">
              <button
                className={TABLE_STYLES.editButton}
                title="Edit"
                aria-label="Edit"
                onClick={() => OnEditFunction(data)}
              >
                Edit <FaEdit className="text-green-500" />
              </button>
              <button
                onClick={() => onDeleteCategory(data._id)}
                className={`${TABLE_STYLES.actionButton} ${TABLE_STYLES.deleteButton}`}
                title="Delete Category"
                aria-label="Delete Category"
              >
                <MdDelete />
              </button>
            </div>
          </td>
        </>
      )}
    </tr>
  );
};

function Table2({
  data = [],
  users = false,
  OnEditFunction,
  onDeleteUser,
  onDeleteCategory
}) {
  // Safety check for data
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">No data available</div>
    );
  }

  return (
    <div className={TABLE_STYLES.container}>
      <table className={TABLE_STYLES.table}>
        <thead>
          <tr className={TABLE_STYLES.headerRow}>
            {users ? (
              <>
                <th scope="col" className={TABLE_STYLES.headerCell}>
                  Image
                </th>
                <th scope="col" className={TABLE_STYLES.headerCell}>
                  ID
                </th>
                <th scope="col" className={TABLE_STYLES.headerCell}>
                  Date
                </th>
                <th scope="col" className={TABLE_STYLES.headerCell}>
                  Full Name
                </th>
                <th scope="col" className={TABLE_STYLES.headerCell}>
                  Email
                </th>
                <th
                  scope="col"
                  className={`${TABLE_STYLES.headerCell} text-right`}
                >
                  Actions
                </th>
              </>
            ) : (
              <>
                <th scope="col" className={TABLE_STYLES.headerCell}>
                  ID
                </th>
                <th scope="col" className={TABLE_STYLES.headerCell}>
                  Date
                </th>
                <th scope="col" className={TABLE_STYLES.headerCell}>
                  Title
                </th>
                <th
                  scope="col"
                  className={`${TABLE_STYLES.headerCell} text-right`}
                >
                  Actions
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {data.map((item, index) => (
            <TableRow
              key={index}
              data={item}
              index={index}
              users={users}
              OnEditFunction={OnEditFunction}
              onDeleteUser={onDeleteUser}
              onDeleteCategory={onDeleteCategory}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table2;
