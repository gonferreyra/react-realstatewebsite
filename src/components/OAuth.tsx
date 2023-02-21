import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { db } from "../firebase.config";

function OAuth() {
  const navigate = useNavigate();
  const onGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account",
      });
      const auth = getAuth();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // console.log(user);

      // check for the user in DB
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      // Add user to firestone DB is it doesn't exists
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      toast.success("Sign up successful");
      navigate("/");
    } catch (error) {
      toast.error("Could not authenticate with Google");
      console.log(error);
    }
  };

  return (
    <button type="button" onClick={onGoogleSignIn} className="OAuth__button">
      <FcGoogle
        style={{
          background: "white",
          fontSize: "24px",
          borderRadius: "50%",
          marginRight: "8px",
        }}
      />
      Continue with Google
    </button>
  );
}

export default OAuth;
