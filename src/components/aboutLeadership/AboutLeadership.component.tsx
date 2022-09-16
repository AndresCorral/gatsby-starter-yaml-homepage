import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import {
  Container,
  FlexList,
  Heading,
  Section,
  Text,
  Box,
  Kicker,
  Space,
} from '#components/ui/Ui.component';
import { AboutProfile as AboutProfileProps } from '#types/AboutProfile.type';
import { AboutLeadership as AboutLeadershipProps } from '#types/AboutLeadership.type';
import { parseImages } from '#lib/utils/ImageQuery.util';
import ImageRenderer from '#components/imageRenderer/ImageRenderer.component';

const aboutLeaderShipImages = graphql`
  query getAboutLeaderShipImages {
    allFile(filter: {relativeDirectory: {eq: "aboutLeadership"}}) {
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

function AboutProfile(props: AboutProfileProps) {
  const { image, jobTitle, name } = props;
  const { allFile: { nodes } } = useStaticQuery(aboutLeaderShipImages);
  const parsedImages = parseImages(nodes);

  const imageProps = { ...image, gatsbyImage: parsedImages[image.name] };

  return (
    <Box width="third" padding={4} center>
      { image && (
        <ImageRenderer {...imageProps} />
      )}
      <Space size={3} />
      <Box>
        {name && (
          <Text variant="medium" bold center>
            {name}
          </Text>
        )}
        {jobTitle && (
          <Text variant="medium" center>
            {jobTitle}
          </Text>
        )}
      </Box>
    </Box>
  );
}

export default function AboutLeadership(props: AboutLeadershipProps) {
  const { profiles, heading, kicker, subhead } = props;

  return (
    <Section>
      <Container width="tight">
        <Box center paddingY={4}>
          {kicker && <Kicker>{kicker}</Kicker>}
          {heading && <Heading as="h1">{heading}</Heading>}
          {subhead && <Text>{subhead}</Text>}
        </Box>
        <FlexList gap={0} variant="center" alignItems="start">
          {profiles.map((profile) => (
            <AboutProfile key={profile.id} {...profile} />
          ))}
        </FlexList>
      </Container>
    </Section>
  );
}
