import React from "react";
import { useHistory } from "react-router-dom";

// video
import video from "./media/404.mkv";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NotFound: React.FC = () => {
  const history = useHistory();
  return (
    <div className="video">
      <div className="top-margin"></div>
      <div className="overlay">
        <video className="videoTag" autoPlay loop muted>
          <source src={video} type="video/mp4" />
        </video>
        <div className="description d-flex justify-content-around">
          <div className="align-self-center text-nowrap">
            <button className="btn" onClick={history.goBack}>
              <FontAwesomeIcon icon="angle-left" size="sm" className="mr-2" />
              back
            </button>
          </div>
          <div>
            <h1>404</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
