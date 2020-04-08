import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Loading = () => {
  return (
    <div className="d-flex align-items-center vh-100">
      <div className="container text-center text-primary">
        <FontAwesomeIcon icon="spinner" size="10x" pulse />
      </div>
    </div>
  );
};

export default Loading;
