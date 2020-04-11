import { useState, useEffect } from "react";

// utils
import { APP_INFO } from "../../lib/utils";
// api
import * as API from "../../lib/api";

export const useVideo: () => { url: string; poster: string } = () => {
  const [video, setVideo] = useState<Video>({ url: "", poster: "" });

  useEffect(() => {
    const preloadVideo = async () => {
      const blob = await API.fetchBLOB(`${APP_INFO.root}/media/404.mkv`);
      const url = window.URL.createObjectURL(blob);
      const poster = `${APP_INFO.root}/media/404.jpg`;
      setVideo({ url, poster });
    };
    preloadVideo();
  }, []);

  return video;
};
