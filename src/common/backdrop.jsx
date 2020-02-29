import React from "react";
import "../css/backdrop.css";

const backdrop = props => {
  return props.show ? (
    <div className="Backdrop" onClick={props.clicked}></div>
  ) : null;
};

export default backdrop;
