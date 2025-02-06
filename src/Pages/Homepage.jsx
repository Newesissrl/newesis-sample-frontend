import React, { useState, useEffect } from "react";
import CardList from "../components/CardList";
import VideoPlayer from "../components/VideoPlayer";
import { cardLists } from "../utils/contentFilterHelper";
import API from "../utils/api";
import { homeVideoTag } from "../utils/contentFilterHelper";

const Homepage = () => {
  const [hasVideo, setHasVideo] = useState(false);
  const lists = cardLists.split("||");

  useEffect(() => {
    const checkForVideo = async () => {
      try {
        const res = await API.fetchAsJson(
          "videos",
          {
            "tags.slug": {
              in: homeVideoTag,
            },
          },
          {
            limit: 1,
            page: 1,
          },
        );
        setHasVideo(res.docs && res.docs.length > 0);
      } catch (e) {
        console.error("Error checking for video:", e);
        setHasVideo(false);
      }
    };

    checkForVideo();
  }, []);

  return (
    <React.Fragment>
      {hasVideo && (
        <div className="mb-8">
          <div className="aspect-video w-full max-w-9xl mx-auto">
            <VideoPlayer
              query={{
                "tags.slug": {
                  in: homeVideoTag,
                },
              }}
            />
          </div>
        </div>
      )}

      {lists.map((list) => {
        const [tag, title] = list.split("=");
        return (
          <CardList
            key={tag}
            title={title}
            query={{
              "tags.slug": {
                in: tag,
              },
            }}
          />
        );
      })}
    </React.Fragment>
  );
};

export default Homepage;
