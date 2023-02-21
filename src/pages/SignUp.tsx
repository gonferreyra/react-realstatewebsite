import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase.config";
import useForm from "../hooks/useForm";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

interface ISignupData {
  name: string;
  email: string;
  password?: string;
  timestamp?: any;
}

function SignUp() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { formData, handleInputChange } = useForm<ISignupData>({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;
  const navigate = useNavigate();

  const formSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password!
      );
      // modificamos el profile para que los datos del name vayan al userName
      updateProfile(userCredential.user, {
        displayName: name,
      });
      const user = userCredential.user;
      // delete password
      // "The operand of a 'delete' operator must be optional"? fix, option on interface and "!" on the userCredential. Hacemos el delete para que no se guarde el password en firestone DB
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      // Timestamp para ver la fecha en que se creo el usuario
      formDataCopy.timestamp = serverTimestamp();

      // Save the data to firestone DB.
      await setDoc(doc(db, "users", user.uid), formDataCopy);

      toast.success("Sign up was successful");
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong with the registration");
    }
  };

  return (
    <section className="signin__section">
      <h1>SignUp</h1>
      <div className="signin__content__container">
        <div className="content__img">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
            alt="houseimg"
          />
        </div>
        <div className="content__form">
          <form onSubmit={formSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={name}
              onChange={(e) => handleInputChange(e)}
            />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => handleInputChange(e)}
            />
            <div className="form__password">
              <input
                type={showPassword ? "text" : "password"}
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
                Have an account?
                <Link to="/sign-in">Sign In</Link>
              </p>
              <p className="paragraph__2">
                <Link to="/forgot-password">Forgot password?</Link>
              </p>
            </div>
            <button className="submit__btn" type="submit">
              Sign Up
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

export default SignUp;
