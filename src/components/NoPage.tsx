import React from "react";
import { Link } from "react-router-dom";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NoPage: React.FC = () => {
  return (
    <>
      <div className="top-margin-sm d-none d-sm-block"></div>
      <div className="top-margin-xs d-block d-sm-none"></div>
      <div className="jumbotron bg-dark text-center mt-4">
        <h1 className="display-1">404</h1>
        <Link className="btn btn-danger mt-4" to="/">
          <FontAwesomeIcon icon="angle-left" size="lg" className="mr-2" />
          Back to homepage
        </Link>
      </div>
    </>
  );
};

export default NoPage;
