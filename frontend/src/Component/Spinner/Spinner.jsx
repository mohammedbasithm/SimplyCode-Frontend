import React from "react";
import "./Spinner.css";

const Spinner = () => {
  return (

    <div class="flex justify-center items-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden"> </span>
      </div>
    </div>

  );
};

export default Spinner;