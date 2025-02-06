import React, { useEffect, useState } from "react";
import Card from "./Card";
import qs from "qs";
import API from "../utils/api";

export default function VideoPlayer({ query }) {
  const [videos, setVideos] = useState([]);
  const [homePageVideo, setHomePageVideo] = useState(null);
  const locale = (qs.parse(window.location.search) || {}).locale || "en";
  const limit = 1;

  const fetchData = async (page) => {
    try {
      const res = await API.fetchAsJson(
        "videos",
        query,
        {
          limit,
          page,
        },
        locale,
      );
      if (res.docs && res.docs.length > 0) {
        setVideos(res.docs);
        setHomePageVideo(res.docs[0]);
      }
    } catch (e) {
      console.error("Error fetching video:", e);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, [query, locale]);

  return (
    <div className="container mx-auto px-4">
      {homePageVideo && (
        <div className="mb-8">
          <div className="aspect-video w-full max-w-9xl mx-auto">
            <video
              className="w-full h-full"
              controls
              autoPlay
              muted
              loop
              playsInline
              poster={homePageVideo.thumb?.url}
            >
              <source src={homePageVideo.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}
