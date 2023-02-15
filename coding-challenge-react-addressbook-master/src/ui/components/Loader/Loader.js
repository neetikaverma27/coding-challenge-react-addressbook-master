import React from "react";
import $ from "./Loader.module.css";

export const Loader = () => (
  <div class={$.container}>
    <div class={$.loader}></div>
  </div>
);

export default Loader;
