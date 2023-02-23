import React from "react";
import useForm from "../hooks/useForm";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router";

interface IFormData {
  name: string;
  email: string;
}

function Profile() {
  const navigate = useNavigate();
  const auth = getAuth();
  const { formData, handleInputChange } = useForm<IFormData>({
    name: auth.currentUser?.displayName!,
    email: auth.currentUser?.email!,
  });

  const { name, email } = formData;

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <>
      <section className="profile__section">
        <h1>My Profile</h1>
        <div className="profile__form__container">
          <form>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => handleInputChange(e)}
              disabled
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
                <span>Edit</span>
              </p>
              <p className="profile__paragraph2" onClick={onLogout}>
                Sign out
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Profile;
