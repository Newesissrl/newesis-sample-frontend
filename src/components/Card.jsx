import React from "react";
import { AiOutlineBlock } from "react-icons/ai";
import { Link } from "react-router-dom";
import Picture from "./Picture";
import ImagePlaceholder from "./ImagePlaceholder";

const Card = ({ item }) => {
  return (
    <Link to={`/story/${item.id}`} className="bg-transparent">
      <div className="h-[20rem] sm:h-[25rem] lg:h-[30rem] rounded-md border border-gray">
        {item.thumb ? (
          <Picture
            thumb={item.thumb}
            title={item.title}
            className="rounded-md"
          />
        ) : (
          <ImagePlaceholder title={item.title} />
        )}
      </div>
      <h2 className="text-center py-2 text-xl">{item.title}</h2>
      <div className="absolute top-2 left-2 bg-blue rounded-full px-2 py-1 text-sm flex items-center gap-1">
        <span>{item.slug || "test"}</span>
        <AiOutlineBlock className="text-lg" />
      </div>
    </Link>
  );
};

export default Card;
