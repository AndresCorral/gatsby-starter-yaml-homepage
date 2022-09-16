import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import {
  Box,
  ButtonList,
  Container,
  Flex,
  Heading,
  Kicker,
  Section,
  Subhead,
  Text,
} from '#components/ui/Ui.component';
import { Hero as HeroProps } from '#types/Hero.type';
import { parseImages } from '#lib/utils/ImageQuery.util';
import ImageRenderer from '#components/imageRenderer/ImageRenderer.component';

const heroImageQuery = graphql`
  query GetHeroImages {
    allFile(filter: {relativeDirectory: {eq: "hero"}}) {
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

export default function Hero(props: HeroProps) {
  const { allFile: { nodes } } = useStaticQuery(heroImageQuery);

  const { image, kicker, subhead, text, links, h1 } = props;
  const parsedImages = parseImages(nodes);

  const imageProps = { ...image, gatsbyImage: parsedImages[image.name] };

  return (
    <Section>
      <Container>
        <Flex gap={4} variant="responsive">
          <Box width="half">
            <ImageRenderer {...imageProps} />
          </Box>
          <Box width="half">
            <Heading as="h1">
              {kicker && <Kicker>{kicker}</Kicker>}
              {h1}
            </Heading>
            <Subhead as="h2">{subhead}</Subhead>
            <Text as="p">{text}</Text>
            <ButtonList links={links} />
          </Box>
        </Flex>
      </Container>
    </Section>
  );
}
