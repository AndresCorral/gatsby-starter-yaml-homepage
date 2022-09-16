import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import {
  Space,
  Container,
  Section,
  FlexList,
  Text,
} from '#components/ui/Ui.component';
import { logos as logosStyle } from '#components/ui/Ui.css';
import ImageRenderer from '#components/imageRenderer/ImageRenderer.component';
import { LogoList as LogoListProps } from '#types/LogoList.type';
import { parseImages } from '#lib/utils/ImageQuery.util';

const logosQuery = graphql`
  query GetLogosImages {
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

export default function LogoList(props: LogoListProps) {
  const { logos = [], text } = props;
  const { allFile: { nodes } } = useStaticQuery(logosQuery);
  const parsedImages = parseImages(nodes);

  return (
    <Section paddingY={4}>
      <Container width="narrow">
        {text && (
          <Text center variant="lead">
            {text}
          </Text>
        )}
        <Space size={4} />
        <FlexList gap={4} variant="center">
          { logos.map(
            (logo) => {
              const imageProps = { ...logo, gatsbyImage: parsedImages[logo.name] };
              return (
                <li key={logo.id}>
                  <ImageRenderer
                    {...imageProps}
                    className={logosStyle.medium}
                  />
                </li>
              );
            },
          )}
        </FlexList>
      </Container>
    </Section>
  );
}
