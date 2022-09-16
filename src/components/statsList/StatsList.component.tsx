import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import {
  Container,
  Section,
  FlexList,
  Text,
  Kicker,
  Heading,
  Flex,
  Box,
  ButtonList,
  Nudge,
} from '#components/ui/Ui.component';
import { AboutStats } from '#types/AboutStats.type';
import { StatsList as StatsListProps } from '#types/StatsList.type';
import ImageRenderer from '#components/imageRenderer/ImageRenderer.component';
import { parseImages } from '#lib/utils/ImageQuery.util';
import { icons } from '#components/ui/Ui.css';

function Stat(props: AboutStats) {
  const { value, label } = props;

  return (
    <Box>
      <Text variant="stat">{value}</Text>
      <Text variant="statLabel">{label}</Text>
    </Box>
  );
}

const aboutHeroImageQuery = graphql`
  query getStatsListImages {
    allFile(filter: {relativeDirectory: {eq: "statsList"}}) {
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

export default function StatList(props: StatsListProps) {
  const { allFile: { nodes } } = useStaticQuery(aboutHeroImageQuery);
  const parsedImages = parseImages(nodes);

  const {
    heading, links, stats, icon, image, kicker, text,
  } = props;

  const iconProps = { ...image, gatsbyImage: parsedImages[icon.name] };
  const imageProps = { ...image, gatsbyImage: parsedImages[image.name] };

  return (
    <Container width="fullbleed">
      <Section padding={5} radius="large" background="block">
        <Flex responsive variant="end">
          <Box width="half">
            {icon && (
              <ImageRenderer {...iconProps} className={icons.medium} />
            )}
            <Heading>
              {kicker && <Kicker>{kicker}</Kicker>}
              {heading}
            </Heading>
            {text && <Text variant="lead">{text}</Text>}
            <FlexList wrap gap={4}>
              {stats.map((stat) => (
                <li key={stat.id}>
                  <Stat {...stat} />
                </li>
              ))}
            </FlexList>
            <ButtonList links={links} reversed />
          </Box>
          <Box width="half">
            {image && (
              <Nudge right={5} bottom={5}>
                <ImageRenderer {...imageProps} />
              </Nudge>
            )}
          </Box>
        </Flex>
      </Section>
    </Container>
  );
}
