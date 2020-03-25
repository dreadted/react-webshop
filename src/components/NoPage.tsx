import React from "react";
import { Link } from "react-router-dom";

const NoPage: React.FC = () => {
  return (
    <div className="jumbotron bg-dark text-center">
      <h1 className="display-1">404</h1>
      <Link className="btn btn-danger" to="/">
        &#8678; Back to homepage
      </Link>
    </div>
  );
};

export default NoPage;
