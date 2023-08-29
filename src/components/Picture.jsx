import React from "react";

export default function Picture({ thumb }) {
  return (
    <picture>
      {thumb.sizes.portrait.url && (
        <source media="(min-width:1024px)" srcSet={thumb.sizes.portrait.url} />
      )}
      {thumb.sizes.hero.url && <source srcSet={thumb.sizes.hero.url} />}
      <img
        src={thumb.sizes.hero.url || thumb.sizes.thumbnail.url}
        alt={thumb.alt || thumb.title}
        loading="lazy"
      />
    </picture>
  );
}
