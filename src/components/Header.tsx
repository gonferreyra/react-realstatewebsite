import { useLocation, useNavigate } from "react-router-dom";
import { Sling as Hamburger } from "hamburger-react";
import { useContext, useState, useEffect } from "react";
import { ContextTest, Props } from "../context/Context";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Header() {
  const [pageState, setPageState] = useState<string>("Sign in");
  const location = useLocation();
  const navigate = useNavigate();
  //   console.log(location.pathname);

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile");
      } else {
        setPageState("Sign In");
      }
    });
  }, [auth]);

  const context = useContext(ContextTest);
  // console.log(context.isOpen);

  function pathMathRoute(route: string) {
    if (route === location.pathname) {
      return true;
    }
  }
  return (
    <div className="header__section">
      <header className="header">
        <div>
          <img
            className="header__logo__img"
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="logo"
            onClick={() => navigate("/")}
          />
        </div>
        <div className="header__desktop">
          <ul className="header__items">
            <li
              className={`${pathMathRoute("/") && "header__items--isActive"}`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`${
                pathMathRoute("/offers") && "header__items--isActive"
              }`}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>
            <li
              className={`${
                (pathMathRoute("/sign-in") || pathMathRoute("/profile")) &&
                "header__items--isActive"
              }`}
              onClick={() => navigate("/profile")}
            >
              {pageState}
            </li>
          </ul>
        </div>
        <div className="header__mobile">
          <button onClick={() => context.toogle()}>
            <Hamburger />
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;
