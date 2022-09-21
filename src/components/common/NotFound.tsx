import React from "react";
import { useHistory } from "react-router-dom";

// video
// import video from "../media/404.mkv";
// import poster from "../media/404.jpg";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface NotFoundProps {
  video: Video;
  hasButton: boolean;
  caption: string;
}

const NotFound: React.FC<NotFoundProps> = ({ video, hasButton, caption }) => {
  const history = useHistory();
  return (
    <div className="video">
      <div className="overlay w-100" style={{ backgroundImage: video.poster }}>
        <video autoPlay loop muted playsInline poster={video.poster}>
          <source src={video.url} type="video/mp4" />
        </video>
        <div className="description d-flex justify-content-around">
          {hasButton && (
            <div className="align-self-center text-nowrap">
              <button className="btn" onClick={history.goBack}>
                <FontAwesomeIcon icon="angle-left" size="sm" className="mr-2" />
                back
              </button>
            </div>
          )}
          <div className="align-self-center text-nowrap">
            <h1>{caption}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
