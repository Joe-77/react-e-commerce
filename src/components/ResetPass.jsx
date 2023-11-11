import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useResetPassMutation } from "../app/feature/api/authApi";
import { toast } from "react-toastify";
import Logo from '../assets/logo.gif'
import Loading from "./Loading";
// import { ResetMyPassword } from "../Auth/authentication";

const ResetPass = () => {
  const validEmail = /\w+@\w+.com/;

  const [checkMail, setCheckMail] = useState(false);

  const [resetPass , {isLoading}] = useResetPassMutation();

  // const resetMutate = ResetMyPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const handleFormSubmit = async (data) => {
    if (document.getElementById("resetPass").value.match(validEmail)) {
      setCheckMail(false);
      await resetPass(data.reset)
        .unwrap()
        .then(() => {
          toast.info("Check your email to reset password !");
        });
      console.log(data.reset);
    } else {
      setCheckMail(true);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col h-[84vh] w-full">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <h2 className="text-3xl text-red-700 italic font-mono tracking-widest mb-10">
          Reset Password
        </h2>
        <div>
          <input
            id="resetPass"
            {...register("reset", { required: true })}
            className="block outline-none border-2 border-zinc-500 text-black px-2 py-1 mt-2 font-bold rounded-lg w-full"
            type="text"
          />
          {errors.reset && (
            <small className="text-xs text-red-700">
              this field is required !
            </small>
          )}
          {checkMail && (
            <small className="text-xs text-red-700">Enter valid email !</small>
          )}
        </div>

        {isLoading ? (
          <Loading/>
        ) : (
          <button className="w-full bg-orange-600 py-2 text-xl tracking-wider rounded-sm mt-5">
            Reset Password
          </button>
        )}
      </form>
    </div>
  );
};

export default ResetPass;
