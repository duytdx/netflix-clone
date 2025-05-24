import API from "./Axios";

// Get all categories API function
export const getCategories = async () => {
    try {
        const response = await API.get("/categories");
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// ********** ADMIN API **********

// create new category API function
export const createCategoryService = async (title, token) => {
    try {
        const response = await API.post("/categories", { title }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// delete category API function
export const deleteCategoryService = async (id, token) => {
    try {
        const response = await API.delete(`/categories/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// update category API function
export const updateCategoryService = async (id, title, token) => {
    try {
        const response = await API.put(`/categories/${id}`, { title }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
