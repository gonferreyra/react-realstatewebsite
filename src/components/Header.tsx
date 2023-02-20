import { useLocation, useNavigate } from "react-router-dom";
import { Sling as Hamburger } from "hamburger-react";
import { useContext, useState } from "react";
import { ContextTest, Props } from "../context/Context";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  //   console.log(location.pathname);

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
                pathMathRoute("/sign-in") && "header__items--isActive"
              }`}
              onClick={() => navigate("/sign-in")}
            >
              SignIn
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
