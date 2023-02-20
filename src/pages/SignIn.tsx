import React, { ChangeEvent } from "react";
import { useState } from "react";
import useForm from "../hooks/useForm";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";

interface ISignipData {
  email: string;
  password: string;
}

function SignIn() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { formData, handleInputChange } = useForm<ISignipData>({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  return (
    <section className="signin__section">
      <h1>SignIn</h1>
      <div className="signin__content__container">
        <div className="content__img">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
            alt="houseimg"
          />
        </div>
        <div className="content__form">
          <form>
            <input
              type="email"
              // id="email"
              name="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => handleInputChange(e)}
            />
            <div className="form__password">
              <input
                type={showPassword ? "text" : "password"}
                // id="email"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => handleInputChange(e)}
              />
              {showPassword ? (
                <AiFillEyeInvisible onClick={() => setShowPassword(false)} />
              ) : (
                <AiFillEye onClick={() => setShowPassword(true)} />
              )}
            </div>
            <div className="form__options">
              <p className="paragraph__1">
                Don't have an account?
                <Link to="/sign-up">Register</Link>
              </p>
              <p className="paragraph__2">
                <Link to="/forgot-password">Forgot password?</Link>
              </p>
            </div>
            <button className="submit__btn" type="submit">
              Sign In
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

export default SignIn;
