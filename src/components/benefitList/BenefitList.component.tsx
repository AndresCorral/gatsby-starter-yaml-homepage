import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import {
  Container,
  Section,
  FlexList,
  Box,
  Heading,
  Text,
  Space,
} from '#components/ui/Ui.component';
import { Benefit as BenefitProps } from '#types/Benefit.type';
import ImageRenderer from '#components/imageRenderer/ImageRenderer.component';
import { icons } from '#components/ui/Ui.css';
import { BenefitList as BenefitListProps } from '#types/BenefitList.type';
import { parseImages } from '#lib/utils/ImageQuery.util';

const benefitsQuery = graphql`
  query GetBenefitImages {
    allFile(filter: {relativeDirectory: {eq: "benefit"}}) {
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

function Benefit(props: BenefitProps) {
  const { heading, text, image } = props;
  const { allFile: { nodes } } = useStaticQuery(benefitsQuery);
  const parsedImages = parseImages(nodes);

  const imageProps = { ...image, gatsbyImage: parsedImages[image.name] };

  return (
    <Box as="li" width="third" padding={4} paddingY={3}>
      {image && (
        <ImageRenderer
          {...imageProps}
          className={icons.small}
        />
      )}
      <Space size={2} />
      <Heading variant="subheadSmall">{heading}</Heading>
      <Text>{text}</Text>
    </Box>
  );
}

export default function BenefitList(props: BenefitListProps) {
  const { benefits, heading, text } = props;

  return (
    <Section>
      <Container>
        <Box center>
          {heading && <Heading>{heading}</Heading>}
          {text && <Text variant="lead">{text}</Text>}
        </Box>
        <Space size={3} />
        <FlexList gutter={3} variant="start" responsive wrap>
          {benefits.map((benefit) => (
            <Benefit key={benefit.id} {...benefit} />
          ))}
        </FlexList>
      </Container>
    </Section>
  );
}
