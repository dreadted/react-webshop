import React from "react";
import { APP_INFO } from "./App";

const Footer = () => {
  return (
    <footer>
      <div>&copy; 2020 Christofer Laurin</div>
      <div>
        {`${APP_INFO.name} ${APP_INFO.version} ${process.env.NODE_ENV}`}
      </div>
    </footer>
  );
};

export default Footer;
