import React from "react";

const Footer = () => {
  return (
    <footer>
      <p className="text-right px-4">
        <small className="text-info">
          &copy; 2020 Christofer Laurin {process.env.NODE_ENV}
        </small>
      </p>
    </footer>
  );
};

export default Footer;
