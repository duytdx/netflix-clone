import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../SideBar";
import { HiPlus } from "react-icons/hi";
import Table2 from "../../../Components/Table2";
import CategoryModal from "../../../Components/Modals/CategoryModal";
import {
  getAllCategoriesAction,
  deleteCategoryAction,
} from "../../../Redux/Actions/CategoriesActions";
import { toast } from "react-toastify";
import { DELETE_CATEGORY_RESET } from "../../../Redux/Constants/CategoriesConstants";

function Categories() {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState();

  // Get all categories
  const { categories, isLoading } = useSelector(
    (state) => state.categoriesGetAll
  );

  // Delete category
  const { isSuccess, isError } = useSelector((state) => state.categoriesDelete);

  // Open modal
  const openModal = () => {
    setModalOpen(true);
  };

  // Edit category handler
  const OnEditFunction = (id) => {
    setCategory(id);
    setModalOpen(true);
  };

  // Delete category handler
  const onDeleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategoryAction(id));
    }
  };

  useEffect(() => {
    // Get all categories
    dispatch(getAllCategoriesAction());
    
    // If modal is closed, reset category
    if (modalOpen === false) {
      setCategory();
    }

    // If delete success, reset state and refetch categories
    if (isSuccess) {
      dispatch({ type: DELETE_CATEGORY_RESET });
      dispatch(getAllCategoriesAction());
    }

    // If delete error, show error
    if (isError) {
      toast.error(isError);
      dispatch({ type: DELETE_CATEGORY_RESET });
    }
  }, [dispatch, modalOpen, isSuccess, isError]);

  return (
    <SideBar>
      {/* Modal component */}
      <CategoryModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        category={category}
      />
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xl font-bold">Categories</h2>
          <button
            onClick={openModal}
            className="bg-main flex cursor-pointer items-center gap-2 font-medium transition hover:bg-subMain border border-red-500 text-white py-2 px-4 rounded"
          >
            <HiPlus /> Create
          </button>
        </div>

        {/* Loading state */}
        {isLoading ? (
          <div className="w-full flex-colo h-40">
            <p>Loading...</p>
          </div>
        ) : (
          <Table2
            data={categories || []}
            users={false}
            OnEditFunction={OnEditFunction}
            onDeleteCategory={onDeleteCategory}
          />
        )}
      </div>
    </SideBar>
  );
}

export default Categories;
