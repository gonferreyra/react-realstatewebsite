import React from "react";
import { PulseLoader } from "react-spinners";

function Spinner() {
  return (
    <div className="spinner__container">
      <div>
        <PulseLoader />
      </div>
    </div>
  );
}

export default Spinner;
