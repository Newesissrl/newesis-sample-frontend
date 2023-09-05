import React from "react";

export default function ImagePlaceholder({ title }) {
  return (
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
      title={title}
      alt=""
    />
  );
}
