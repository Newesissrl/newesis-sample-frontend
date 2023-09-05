import React from "react";
import { AiOutlineBlock } from "react-icons/ai";
import { Link } from "react-router-dom";
import Picture from "./Picture";

const Card = ({ item }) => {
  return (
    <Link
      to={`/story/${item.id}`}
      className="bg-black relative transition duration-200 ease-in transform hover:scale-110"
    >
      <div className="h-[20rem] sm:h-[25rem] lg:h-[30rem]">
        {item.thumb ? (
          <Picture thumb={thumb} title={item.title} className="rounded-md" />
        ) : (
          <ImagePlaceholder title={item.title} />
        )}
      </div>
      <h1 className="text-center py-2 text-xl">{item.title}</h1>
      <div className="absolute top-2 left-2 bg-blue rounded-full px-2 py-1 text-sm flex items-center gap-1">
        <span>{item.slug || "test"}</span>
        <AiOutlineBlock className="text-lg" />
      </div>
    </Link>
  );
};

export default Card;
