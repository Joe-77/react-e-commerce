import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSignUpMutation } from "../app/feature/api/authApi";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
const SignUp = () => {
  const navigate = useNavigate();
  const validEmail = /\w+@\w+.com/;

  const [checkMail, setCheckMail] = useState(false);

  const [signUp, { isLoading }] = useSignUpMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const handleFormSubmit = async (data) => {
    if (document.getElementById("Email").value.match(validEmail)) {
      setCheckMail(false);
      await signUp(data)
        .unwrap()
        .then(() => {
          navigate("/login");
          toast.success("Account Created Successfully");
        });
    } else {
      setCheckMail(true);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col h-[84vh] w-full">
      <h2 className="text-3xl text-red-700 italic font-mono tracking-widest">
        Sign Up
      </h2>

      <div className="w-[280px] md:w-[250px]">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="my-5">
            <label className="block" htmlFor="userName">
              Username : <span className="text-red-400"> * </span>
            </label>
            <input
              id="userName"
              {...register("userName", { required: true })}
              type="text"
              className="block outline-none border-2 border-zinc-500 text-black px-2 py-1 mt-2 font-bold rounded-lg w-full"
            />
            {errors.userName && (
              <small className="text-xs text-orange-500">
                this field is required !
              </small>
            )}
          </div>
          <div className="my-5">
            <label className="block" htmlFor="Email">
              Email : <span className="text-red-400"> * </span>
            </label>
            <input
              id="Email"
              {...register("email", { required: true })}
              type="text"
              className="block outline-none border-2 border-zinc-500 text-black px-2 py-1 mt-2 font-bold rounded-lg w-full"
            />
            {errors.email && (
              <small className="text-xs text-orange-500">
                this field is required !
              </small>
            )}

            {checkMail && (
              <small className="text-xs text-orange-500">
                Enter valid email !
              </small>
            )}
          </div>
          <div className="my-5">
            <label className="block" htmlFor="pass">
              Password : <span className="text-red-400"> * </span>
            </label>
            <input
              id="pass"
              {...register("password", {
                required: true,
                minLength: 4,
                maxLength: 60,
              })}
              type="password"
              className="block outline-none border-2 border-zinc-500 text-black px-2 py-1 mt-2 font-bold rounded-lg w-full"
            />
            {errors.password && (
              <small className="text-xs text-orange-500">
                Your password must contain between 4 and 60 characters.
              </small>
            )}
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <button className="w-full bg-orange-600 py-2 text-xl tracking-wider rounded-sm">
              Sign Up
            </button>
          )}
        </form>
        <div className="text-end mt-1">
          <Link to={"/login"}>
            <small className="text-xs text-orange-600">
              already have an account?
            </small>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

/*


*/
