import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import {
  Container,
  Section,
  Flex,
  Box,
  Subhead,
  Kicker,
  Text,
  ButtonList,
} from '#components/ui/Ui.component';
import { Feature as FeatureProps } from '#types/Feature.type';
import { parseImages } from '#lib/utils/ImageQuery.util';
import ImageRenderer from '#components/imageRenderer/ImageRenderer.component';

interface ExtraFeatureProps {
  flip: boolean,
}

const featureQuery = graphql`
  query GetFeatureImage {
    allFile(filter: {relativeDirectory: {eq: "feature"}}) {
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

export default function Feature(props: FeatureProps & ExtraFeatureProps) {
  const { flip, image, heading, links, text, kicker } = props;
  const { allFile: { nodes } } = useStaticQuery(featureQuery);
  const parsedImages = parseImages(nodes);

  const imageProps = { ...image, gatsbyImage: parsedImages[image.name] };

  return (
    <Section padding={4}>
      <Container>
        <Flex gap={4} variant="responsive">
          <Box width="half" order={flip ? 1 : null}>
            <ImageRenderer {...imageProps} />
          </Box>
          <Box width="half">
            <Subhead>
              {kicker && <Kicker>{kicker}</Kicker>}
              {heading}
            </Subhead>
            <Text variant="lead">{text}</Text>
            <ButtonList links={links} />
          </Box>
        </Flex>
      </Container>
    </Section>
  );
}
