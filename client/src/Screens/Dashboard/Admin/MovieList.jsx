import React from "react";
import SideBar from "../SideBar";
import Table from "../../../Components/Table";
import { MovieData } from "../../../Data/MovieData";

function MovieList() {
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xl font-bold">Movies List</h2>
          <button className="bg-main font-medium transition hover:bg-subMain border border-red-500 text-white py-3 px-6 rounded">
            Delete All{" "}
          </button>
        </div>

        <Table data={MovieData} admin={true}/>
      </div>
    </SideBar>
  );
}

export default MovieList;
