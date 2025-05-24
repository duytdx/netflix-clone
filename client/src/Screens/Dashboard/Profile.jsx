import React, { useEffect, useState } from "react";
import SideBar from "../../Screens/Dashboard/SideBar";
import Uploader from "../../Components/Uploader";
import { Input } from "../../Components/UsedInputs";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProfileValidation } from "../../Components/Validation/UserValidation";
import { InlineError } from "../../Components/Notfications/Error";
import { useNavigate } from "react-router-dom";
import { ImagePreview } from "../../Components/imagepreview";
import { updateProfileAction, deleteProfileAction } from "../../Redux/Actions/userActions";
import { toast } from "react-toastify";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);
  const [imageUrl, setImageUrl] = useState(userInfo ? userInfo.image : "");
  const { isLoading, isSuccess, isError } = useSelector((state) => state.userUpdateProfile);
  const { isLoading: deleteLoading, isError: deleteError } = useSelector((state) => state.userDeleteProfile);

  // validate user
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(ProfileValidation)
  })

  // update profile
  const onSubmit = (data) => {
    dispatch(updateProfileAction({ ...data, image: imageUrl }));
  }

  // delete profile
  const deleteProfile = () => {
    window.confirm("Are you sure you want to delete your account?") && dispatch(deleteProfileAction());
  }

  // useEffect
  useEffect(() => {
    if (userInfo) {
      setValue("fullName", userInfo.fullName);
      setValue("email", userInfo.email);
    }
    if (isSuccess) {
      dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
    }
    if (isError || deleteError) {
      toast.error(isError || deleteError);
    }
  }, [userInfo, setValue, isSuccess, isError, dispatch, deleteError]);

  return (
    <SideBar>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Profile</h2>
        <div className="w-full grid lg:grid-cols-12 gap-6">
          <div className="col-span-10">
            <Uploader setImageUrl={setImageUrl} />
          </div>
          <div className="col-span-2">
            <ImagePreview image={imageUrl} name={userInfo ? userInfo.fullName : "John Doe"} />
          </div>
        </div>
        <div className="w-full">
          <Input
            label="Full Name"
            placeholder="John Doe"
            type="text"
            name="fullName"
            register={register("fullName")}
            bg={true}
          />
          {errors.fullName && <InlineError text={errors.fullName.message} />}
        </div>
        <div className="w-full">
          <Input
            label="Email"
            placeholder="example@email.com"
            type="email"
            name="email"
            register={register("email")}
            bg={true}
          />
          {errors.email && <InlineError text={errors.email.message} />}
        </div>
        <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
          <button
            type="button"
            className="bg-red-500 hover:bg-red-600 transition border border-red-500 text-white py-4 px-6 rounded-lg w-full sm:w-auto cursor-pointer"
            disabled={deleteLoading}
            onClick={deleteProfile}>
            {deleteLoading ? "Deleting..." : "Delete Account"}
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-main hover:bg-red-600 transition border border-red-500 text-white py-4 px-6 rounded-lg w-full sm:w-auto cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? "Updating..." : "Update Account"}
          </button>
        </div>
      </form>
    </SideBar>
  );
}

export default Profile;