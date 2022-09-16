import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { Container, Section, Text, SuperHeading } from '#components/ui/Ui.component';
import { AboutHero as AboutHeroProps } from '#types/AboutHero.type';
import { parseImages } from '#lib/utils/ImageQuery.util';
import ImageRenderer from '#components/imageRenderer/ImageRenderer.component';

import * as styles from './AboutHero.css';

const aboutHeroImageQuery = graphql`
  query getAboutHeroImage {
    allFile(filter: {relativeDirectory: {eq: "aboutHero"}}) {
      nodes {
        name
        childImageSharp {
          gatsbyImageData(
            placeholder: BLURRED
            layout: CONSTRAINED
            quality: 100
          )
        }
      }
    }
  }
`;

export default function AboutHero(props: AboutHeroProps) {
  const { allFile: { nodes } } = useStaticQuery(aboutHeroImageQuery);
  const parsedImages = parseImages(nodes);

  const { heading, image, text } = props;

  const imageProps = { ...image, gatsbyImage: parsedImages[image.name] };

  return (
    <Section>
      <Container>
        <SuperHeading className={styles.aboutHeroHeader}>
          {heading}
        </SuperHeading>
        {text && (
          <Text className={styles.aboutHeroText}>{text}</Text>
        )}
      </Container>
      <Container>
        {image && (
          <ImageRenderer {...imageProps} className={styles.aboutHeroImage} />
        )}
      </Container>
    </Section>
  );
}
