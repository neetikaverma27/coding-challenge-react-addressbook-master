import React from "react";
import Button from "../Button/Button";
import $ from "./Form.module.css";

const Form = ({ legend, onSubmit, buttonText, variant, children }) => {
  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        {legend && <legend>{legend}</legend>}

        {React.Children.map(children, (child) => (
          <div className={$.formRow}>{child}</div>
        ))}

        <Button type="submit" variant={variant}>
          {buttonText}
        </Button>
      </fieldset>
    </form>
  );
};

export default Form;
