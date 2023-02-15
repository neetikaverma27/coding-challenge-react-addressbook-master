import React from "react";

import $ from "./Button.module.css";

const getVariantClass = (variant) => {
  switch (variant) {
    case "primary":
      return $.primary;

    case "secondary":
      return $.secondary;

    default:
      return "";
  }
};

const Button = ({ children, onClick, type = "button", variant }) => {
  return (
    <button
      // DONE TODO: Add conditional classNames
      // - Must have a condition to set the '.primary' className
      // - Must have a condition to set the '.secondary' className
      className={`${$.button} ${getVariantClass(variant)}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
