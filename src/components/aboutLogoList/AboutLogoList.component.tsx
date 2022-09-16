import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import {
  Container,
  Heading,
  FlexList,
  LinkList,
  Section,
  Box,
} from '#components/ui/Ui.component';
import { AboutLogoList as AboutLogoListProps } from '#types/LogoList.type';
import ImageRenderer from '#components/imageRenderer/ImageRenderer.component';
import { parseImages } from '#lib/utils/ImageQuery.util';

const logosQuery = graphql`
  query GetAboutLogosImages {
    allFile(filter: {relativeDirectory: {eq: "logos"}}) {
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

export default function AboutLogoList(props: AboutLogoListProps) {
  const { links, logos, heading } = props;
  const { allFile: { nodes } } = useStaticQuery(logosQuery);
  const parsedImages = parseImages(nodes);

  return (
    <Section>
      <Container>
        <Box center>
          {heading && <Heading>{heading}</Heading>}
          <LinkList links={links} />
        </Box>
      </Container>
      <Container width="narrow">
        <Box paddingY={5}>
          <FlexList gap={5} variant="center">
            {logos.map((logo) => {
              const imageProps = { ...logo, gatsbyImage: parsedImages[logo.name] };
              return (
                <li key={`${logo.id}`}>
                  <ImageRenderer {...imageProps} />
                </li>
              );
            })}
          </FlexList>
        </Box>
      </Container>
    </Section>
  );
}
