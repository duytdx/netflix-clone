import React, { useEffect } from "react";
import SideBar from "./SideBar";
import { Input } from "../../Components/UsedInputs";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PasswordValidation } from "../../Components/Validation/UserValidation";
import { InlineError } from "../../Components/Notfications/Error";
import { changePasswordAction } from "../../Redux/Actions/userActions";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { USER_CHANGE_PASSWORD_RESET } from "../../Redux/Constants/userConstants";

function Password() {
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message } = useSelector((state) => state.userChangePassword);

  // validate user
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PasswordValidation),
  });

  // on submit
  const onSubmit = (data) => {
    dispatch(changePasswordAction(data));
  };

  // useEffect
  useEffect(() => {
    if (isSuccess) {
      dispatch({ type: USER_CHANGE_PASSWORD_RESET });
    }
    if (isError) {
      toast.error(isError);
      dispatch({ type: USER_CHANGE_PASSWORD_RESET });
    }
    if (message) {
      toast.success(message);
      reset();
    }
  }, [isSuccess, isError, message, dispatch, reset]);

  return (
    <SideBar>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Change Password</h2>
        <div className="w-full">
          <Input
            label="Old Password"
            placeholder="********"
            type="password"
            bg={true}
            name="oldPassword"
            register={register("oldPassword")}
          />
          {errors.oldPassword && <InlineError text={errors.oldPassword.message} />}
        </div>
        <div className="w-full">
          <Input
            label="New Password"
            placeholder="********"
            type="password"
            bg={true}
            name="newPassword"
            register={register("newPassword")}
          />
          {errors.newPassword && <InlineError text={errors.newPassword.message} />}
        </div>
        <div className="w-full">
          <Input
            label="Confirm Password"
            placeholder="********"
            type="password"
            bg={true}
            name="confirmPassword"
            register={register("confirmPassword")}
          />
          {errors.confirmPassword && <InlineError text={errors.confirmPassword.message} />}
        </div>
        <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
          <button disabled={isLoading} type="submit" className="bg-main hover:bg-red-600 transition border border-red-500 text-white py-4 px-6 rounded-lg w-full sm:w-auto cursor-pointer">
            {isLoading ? "Changing..." : "Change Password"}
          </button>
        </div>
      </form>
    </SideBar>
  );
}

export default Password;
