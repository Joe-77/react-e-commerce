import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { BsGoogle } from "react-icons/bs";
import {
  useLoginMutation,
  useSignInWithGoogleMutation,
} from "../app/feature/api/authApi";
import { toast } from "react-toastify";
import Loading from "./Loading";
const Login = ({ auth }) => {
  const navigate = useNavigate();
  const validEmail = /\w+@\w+.com/;

  const [checkMail, setCheckMail] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const [signInWithGoogle] = useSignInWithGoogleMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const handleFormSubmit = async (data) => {
    if (document.getElementById("Email").value.match(validEmail)) {
      setCheckMail(false);

      await login(data)
        .unwrap()
        .then(() => {
          toast.success("Login Successfully");
          navigate("/shop");
          auth(true);
          localStorage.setItem("isAuth", true);
        });
    } else {
      setCheckMail(true);
    }
  };

  const loginWithGoogle = async () => {
    await signInWithGoogle()
      .unwrap()
      .then(() => {
        toast.success("Login Successfully");
        navigate("/shop");
        auth(true);
        localStorage.setItem("isAuth", true);
      });
  };

  return (
    <div className="flex items-center justify-center flex-col h-[84vh] w-full">
      <h2 className="text-3xl text-red-700 italic font-mono tracking-widest">
        Login
      </h2>

      <div className="w-[280px] md:w-[250px]">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
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
            <div>
              <button className="w-full bg-orange-600 py-2 text-xl tracking-wider rounded-sm">
                Sign In
              </button>

              <button
                onClick={loginWithGoogle}
                className="w-full bg-blue-500 py-2 tracking-wider rounded-sm mt-5 text-center flex items-center gap-2 justify-center duration-700 hover:bg-sky-800"
              >
                <BsGoogle /> Continue with Google
              </button>
            </div>
          )}
        </form>

        <div className="text-end mt-1">
          <Link to={"/reset-password"}>
            <small className="text-xs text-orange-600">Need help?</small>
          </Link>
        </div>
        <div className="text-gray-500 text-xs">
          Don't have account?
          <Link to={"/signUp"}>
            <span className="text-black hover:underline"> Sign up now.</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
