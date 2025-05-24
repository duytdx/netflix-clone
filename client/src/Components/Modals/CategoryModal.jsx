import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainModal from "./MainModal"
import { Input } from "../UsedInputs";
import { toast } from "react-toastify";
import {
  createCategoryAction,
  updateCategoryAction,
} from "../../Redux/Actions/CategoriesActions";
import {
  CREATE_CATEGORY_RESET,
  UPDATE_CATEGORY_RESET,
} from "../../Redux/Constants/CategoriesConstants";

function CategoryModal({ modalOpen, setModalOpen, category }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const { isLoading, isError, isSuccess } = useSelector(
    (state) => category ? state.categoriesUpdate : state.categoriesCreate
  );

  // useEffect for form handling
  useEffect(() => {
    if (category) {
      setTitle(category.title);
    }

    // if modal is closed, reset form
    if (!modalOpen) {
      setTitle("");
    }
  }, [category, modalOpen]);

  // useEffect for success handling
  useEffect(() => {
    if (isSuccess) {
      dispatch(category ? { type: UPDATE_CATEGORY_RESET } : { type: CREATE_CATEGORY_RESET });
      setModalOpen(false);
      setTitle("");
      toast.success(`Category ${category ? "updated" : "created"} successfully`);
    }

    if (isError) {
      toast.error(isError);
      dispatch(category ? { type: UPDATE_CATEGORY_RESET } : { type: CREATE_CATEGORY_RESET });
    }
  }, [isSuccess, isError, dispatch]);

  // Submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (title) {
      if (category) {
        dispatch(updateCategoryAction(category._id, title));
      } else {
        dispatch(createCategoryAction(title));
      }
    } else {
      toast.error("Please enter a category name");
    }
  };

  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="text-2xl font-bold text-white mb-6">
        {category ? "Edit Category" : "Create New Category"}
      </div>

      <form onSubmit={submitHandler} className="flex flex-col gap-5">
        <Input
          label="Category Name"
          placeholder="e.g., Action"
          type="text"
          bg={true}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-lg bg-[#e50914] hover:bg-red-700 text-white font-semibold transition disabled:bg-red-800"
        >
          {isLoading 
            ? "Loading..." 
            : category 
              ? "Update" 
              : "Create"
          }
        </button>
      </form>
    </MainModal>
  );
}

export default CategoryModal;
