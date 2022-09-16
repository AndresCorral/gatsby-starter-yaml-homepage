import React from 'react';
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image';

import { HomepageImage } from '#types/Image.type';

interface ImageRendererProps extends HomepageImage {
  gatsbyImage?: ImageDataLike,
  className?: string,
}

export default function ImageRenderer({ alt, url, name, gatsbyImage, className }: ImageRendererProps) {
  if (url) {
    return <img alt={alt} src={url} title={name} />;
  }

  if (!gatsbyImage) return null;

  return (
    <GatsbyImage
      alt={alt}
      image={getImage(gatsbyImage)}
      className={className}
    />
  );
}
