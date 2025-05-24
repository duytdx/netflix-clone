import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SideBar from "../SideBar";
import Table2 from "../../../Components/Table2";
import Loader from "../../../Components/Notfications/Loader";
import { getAllUsersAction, deleteUserAction } from "../../../Redux/Actions/userActions";
import { GET_ALL_USERS_RESET, DELETE_USER_RESET } from "../../../Redux/Constants/userConstants";

function Users() {
  const dispatch = useDispatch();
  const { isLoading, isError, users } = useSelector((state) => state.adminGetAllUsers);
  const { isLoading: deleteLoading, isError: deleteError, isSuccess } = useSelector((state) => state.adminDeleteUser);

  // delete user handler
  const onDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUserAction(userId));
    }
  }

  // Load users on component mount
  useEffect(() => {
    dispatch(getAllUsersAction());
  }, [dispatch]);

  // Handle errors and success
  useEffect(() => {
    if (isError) {
      toast.error(isError);
      dispatch({ type: GET_ALL_USERS_RESET });
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch({ type: DELETE_USER_RESET });
    }
    if (isSuccess) {
      toast.success("User deleted successfully");
      dispatch({ type: DELETE_USER_RESET });
      dispatch(getAllUsersAction());
    }
  }, [dispatch, isError, deleteError, isSuccess]);

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Users</h2>
        {isLoading ? (
          <Loader />
        ) : (
          <Table2 
            data={users} 
            users={true} 
            OnEditFunction={null} 
            onDeleteUser={onDeleteUser} 
          />
        )}
      </div>
    </SideBar>
  );
}

export default Users;
