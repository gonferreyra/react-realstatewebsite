import React, { useState } from "react";
import useForm from "../hooks/useForm";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { FcHome } from "react-icons/fc";
import { Link } from "react-router-dom";

interface IFormData {
  name: string;
  email: string;
}

function Profile() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [changeDetail, setChangedDetail] = useState<boolean>(false);
  const { formData, handleInputChange } = useForm<IFormData>({
    name: auth.currentUser?.displayName!,
    email: auth.currentUser?.email!,
  });

  const { name, email } = formData;

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser !== null) {
        if (auth.currentUser?.displayName !== name) {
          // update displayName in firebase auth
          await updateProfile(auth.currentUser, {
            displayName: name,
          });

          // update name in firestone
          const docRef = doc(db, "users", auth.currentUser.uid);
          await updateDoc(docRef, {
            name: name,
          });
        }
        toast.success("Profile datails update");
      }
    } catch (error) {
      toast.error("Could not update the profile details");
    }
  };

  return (
    <>
      <section className="profile__section">
        <h1>My Profile</h1>
        <div className="profile__form__container">
          <form>
            <input
              style={{
                background: changeDetail ? "rgb(254 202 202)" : "inherit",
              }}
              type="text"
              name="name"
              value={name}
              onChange={(e) => handleInputChange(e)}
              disabled={!changeDetail}
            />
            <input
              type="email"
              name="email"
              value={email}
              disabled
              onChange={(e) => handleInputChange(e)}
            />
            <div className="profile__changename">
              <p className="profile__paragraph1">
                Do you want to change your name?
                <span
                  onClick={() => {
                    changeDetail && onSubmit();
                    setChangedDetail((prevState) => !prevState);
                  }}
                >
                  {changeDetail ? "Apply change" : "Edit"}
                </span>
              </p>
              <p className="profile__paragraph2" onClick={onLogout}>
                Sign out
              </p>
            </div>
          </form>
          <button className="sell__btn" type="submit">
            <Link to="/create-listing">
              <FcHome />
              Sell or rent your home
            </Link>
          </button>
        </div>
      </section>
    </>
  );
}

export default Profile;
