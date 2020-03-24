import React from "react";
import { Link } from "react-router-dom";

const NoPage: React.FC = () => {
  return (
    <>
      <div className="display">404</div>
      <Link to="/">&#8678; Back to homepage</Link>
    </>
  );
};

export default NoPage;
