import React from "react";
import { APP_INFO } from "./App";

const Footer = () => {
  return (
    <footer className="text-right text-secondary px-4">
      <p>
        <small>
          {`${APP_INFO.name} ${APP_INFO.version} ${process.env.NODE_ENV}`}
          <br />
          &copy; 2020 Christofer Laurin
        </small>
      </p>
    </footer>
  );
};

export default Footer;
