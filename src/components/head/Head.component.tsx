import React from 'react';

export default function HeadComponent(props: {title: string, description? : string, image?: string}) {
  const { title, description = 'Awesome web page', image } = props;

  return (
    <>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta
        name="description"
        property="og:description"
        content={description}
      />
      <meta property="og:title" content={title} />
      <meta property="og:title" content={title} />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}
    </>
  );
}
