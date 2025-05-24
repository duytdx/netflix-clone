import * as CategoriesConstants from "../Constants/CategoriesConstants.jsx";
import * as categoriesAPIs from "../APIs/CategoriesService.jsx";
import { toast } from "react-toastify";
import { ErrorAction, tokenProtection } from "../Protection.jsx";

// Get all Categories Action
export const getAllCategoriesAction = () => async (dispatch) => {
    try {
        dispatch({ type: CategoriesConstants.GET_ALL_CATEGORIES_REQUEST });
        const data = await categoriesAPIs.getCategories();
        dispatch({ 
            type: CategoriesConstants.GET_ALL_CATEGORIES_SUCCESS, 
            payload: data 
        });
    } catch (error) {
        ErrorAction(error, dispatch, CategoriesConstants.GET_ALL_CATEGORIES_FAIL);
    }
};

// Create Category Action
export const createCategoryAction = (title) => async (dispatch, getState) => {
    try {
        dispatch({ type: CategoriesConstants.CREATE_CATEGORY_REQUEST });
        const data = await categoriesAPIs.createCategoryService(title, tokenProtection(getState));
        dispatch({ 
            type: CategoriesConstants.CREATE_CATEGORY_SUCCESS,
            payload: data
        });
        // Refresh categories list after creation
        dispatch(getAllCategoriesAction());
        toast.success("Category created successfully");
    } catch (error) {
        ErrorAction(error, dispatch, CategoriesConstants.CREATE_CATEGORY_FAIL);
    }
};

// Update Category Action
export const updateCategoryAction = (id, title) => async (dispatch, getState) => {
    try {
        dispatch({ type: CategoriesConstants.UPDATE_CATEGORY_REQUEST });
        const data = await categoriesAPIs.updateCategoryService(id, title, tokenProtection(getState));
        dispatch({ 
            type: CategoriesConstants.UPDATE_CATEGORY_SUCCESS,
            payload: data
        });
        // Refresh categories list after update
        dispatch(getAllCategoriesAction());
        toast.success("Category updated successfully");
    } catch (error) {
        ErrorAction(error, dispatch, CategoriesConstants.UPDATE_CATEGORY_FAIL);
    }
};

// Delete Category Action
export const deleteCategoryAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: CategoriesConstants.DELETE_CATEGORY_REQUEST });
        await categoriesAPIs.deleteCategoryService(id, tokenProtection(getState));
        dispatch({ 
            type: CategoriesConstants.DELETE_CATEGORY_SUCCESS 
        });
        // Refresh categories list after deletion
        dispatch(getAllCategoriesAction());
        toast.success("Category deleted successfully");
    } catch (error) {
        ErrorAction(error, dispatch, CategoriesConstants.DELETE_CATEGORY_FAIL);
    }
};       
