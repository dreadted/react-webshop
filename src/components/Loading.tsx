import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Loading = () => {
  return (
    <div className="loading text-primary">
      <FontAwesomeIcon icon="spinner" size="10x" pulse />
    </div>
  );
};

export default Loading;
