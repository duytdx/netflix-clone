import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import { Input } from "../Components/UsedInputs";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { RegisterValidation } from "../Components/Validation/UserValidation";
import { registerAction } from "../Redux/Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { InlineError } from "../Components/Notfications/Error";
function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess, userInfo } = useSelector((state) => state.userLogin);

  // validate user
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(RegisterValidation) });

  // on submit
  const onSubmit = (data) => {
    dispatch(registerAction(data));
  };

  // useEffect
  useEffect(() => {
    if (userInfo?.isAdmin) {
      navigate("/dashboard");
    } else if (userInfo) {
      navigate("/profile");
    }
    if (isSuccess) {
      toast.success(`Welcome ${userInfo?.fullName}`);
      dispatch({ type: "USER_REGISTER_RESET" });
    }
    if (isError) {
      toast.error(isError);
      dispatch({ type: "USER_REGISTER_RESET" });
    }
  }, [userInfo, navigate, isSuccess, isError, dispatch]);

  return (
    <Layout>
      <div className="container mx-auto px-2 my-24 flex justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry rounded-lg border border-border">
          <img
            src="/images/logo.png"
            alt="logo"
            className="w-full h-12 object-contain"
          />
          <div className="w-full">
            <Input
              label="Full Name"
              placeholder="Netflix"
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
              placeholder="netflix@gmail.com"
              type="email"
              name="email"
              register={register("email")}
              bg={true}
            />
            {errors.email && <InlineError text={errors.email.message} />}
          </div>


          <div className="w-full">
            <Input
              label="Password"
              placeholder="********"
              type="password"
              bg={true}
              name="password"
              register={register("password")}
            />
            {errors.password && <InlineError text={errors.password.message} />}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-subMain mt-6 transitions hover:bg-main flex items-center justify-center gap-4 text-white p-4 rounded-lg w-full text-sm"
          >
            {
              isLoading ? (
                "Loading..."
              ) : (
                <>
                  <FiLogIn className="w-5 h-5" /> Sign Up
                </>
              )
            }
          </button>
          <p className="text-center text-border mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-dryGray font-semibold ml-2 hover:text-subMain transitions">
              Sign In
            </Link>
          </p>
        </form>
      </div >
    </Layout >
  );
}

export default Register;