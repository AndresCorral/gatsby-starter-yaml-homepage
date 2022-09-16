import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import {
  Nudge,
  Container,
  Section,
  Heading,
  Text,
  ButtonList,
  Kicker,
} from '#components/ui/Ui.component';
import { Cta } from '#types/Cta.type';
import { parseImages } from '#lib/utils/ImageQuery.util';
import ImageRenderer from '#components/imageRenderer/ImageRenderer.component';

const CtaImageQuery = graphql`
  query getCtaImageQuery {
    allFile(filter: {relativeDirectory: {eq: "cta"}}) {
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

export default function HomepageCta(props: Cta) {
  const { heading, links, text, image, kicker } = props;
  const { allFile: { nodes } } = useStaticQuery(CtaImageQuery);
  const parsedImages = parseImages(nodes);

  const imageProps = { ...image, gatsbyImage: parsedImages[image.name] };

  return (
    <Container width="fullbleed">
      <Section padding={5} radius="large" background="block">
        <Heading center>
          {kicker && <Kicker center>{kicker}</Kicker>}
          {heading}
        </Heading>
        <Text as="p" center variant="lead">
          {text}
        </Text>
        <ButtonList links={links} variant="center" reversed />
        {image && (
          <Nudge left={5} right={5} bottom={5}>
            <ImageRenderer {...imageProps} />
          </Nudge>
        )}
      </Section>
    </Container>
  );
}
