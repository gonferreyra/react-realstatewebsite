import React from "react";
import SignIn from "../pages/SignIn";
import { useContext } from "react";
import { ContextTest } from "../context/Context";

function HeaderAside() {
  const { isOpen } = useContext(ContextTest);

  return (
    <section className={isOpen ? "aside__section" : "closed"}>
      <aside className="aside">
        <div className="aside__logo">
          <img
            className="header__logo__img"
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="logo"
          />
        </div>
        <div className="aside__links">
          <ul>
            <li>Home</li>
            <li>Offers</li>
            <li>SignIn</li>
          </ul>
        </div>
      </aside>
    </section>
  );
}

export default HeaderAside;
