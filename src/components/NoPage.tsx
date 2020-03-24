import React from "react";
import { Link } from "react-router-dom";

const NoPage: React.FC = () => {
  return (
    <>
      <h1 className="display-1">404</h1>
      <Link className="btn btn-warning" to="/">
        &#8678; Back to homepage
      </Link>
    </>
  );
};

export default NoPage;
