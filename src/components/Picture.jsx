import React from "react";
import pictureHelper from "../utils/pictureHelper";

export default function Picture({ thumb, title, className }) {
  return (
    <picture>
      <source
        media="(min-width:1024px)"
        srcSet={pictureHelper.TransformMedia(thumb, "portrait")}
      />
      <img
        src={pictureHelper.TransformMedia(thumb, "hero")}
        alt={title}
        className={className}
        loading="lazy"
      />
    </picture>
  );
}
