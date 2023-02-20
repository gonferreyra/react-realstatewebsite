import React from "react";
import { FcGoogle } from "react-icons/fc";

function OAuth() {
  return (
    <button className="OAuth__button">
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
