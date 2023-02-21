import React, { useState } from "react";
import useForm from "../hooks/useForm";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
import { toast } from "react-toastify";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

interface IForgotPassword {
  email: string;
}

function ForgotPassword() {
  const { formData, handleInputChange } = useForm<IForgotPassword>({
    email: "",
  });

  const { email } = formData;

  const forgotPassword = async (e: any) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email sent. Check you email to change your password");
    } catch (error) {
      toast.error("Could not send reset password email");
      console.log(error);
    }
  };

  return (
    <section className="signin__section">
      <h1>Forgot-Password</h1>
      <div className="signin__content__container">
        <div className="content__img">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
            alt="houseimg"
          />
        </div>
        <div className="content__form">
          <form onSubmit={forgotPassword}>
            <input
              type="email"
              // id="email"
              name="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => handleInputChange(e)}
            />
            <div className="form__options">
              <p className="paragraph__1">
                Don't have an account?
                <Link to="/sign-up">Register</Link>
              </p>
              <p className="paragraph__2">
                <Link to="/sign-in">Sign in instead</Link>
              </p>
            </div>
            <button className="submit__btn" type="submit">
              Send reset password
            </button>
            <div className="content__or">
              <span></span>
              <p className="content__or__btn">OR</p>
              <span></span>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
