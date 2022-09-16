import * as React from 'react';

import { AboutStatsList as AboutStatsListProps, AboutStats as AboutStatsProps } from '#types/AboutStats.type';
import { Container, Section, FlexList, Box, Text, Heading } from '#components/ui/Ui.component';

import * as styles from './AboutStatsList.css';

function AboutStat(props: AboutStatsProps) {
  const { label, value } = props;

  return (
    <Box width="fitContent" className={styles.statContainer}>
      {value && <Text variant="stat">{value}</Text>}
      {label && <Text variant="statLabel">{label}</Text>}
    </Box>
  );
}

export default function AboutStatList(props: AboutStatsListProps) {
  const { stats, heading, text } = props;

  return (
    <Section>
      <Container>
        <Box center>
          {heading && <Heading>{heading}</Heading>}
          {text && <Text variant="lead">{text}</Text>}
        </Box>
        <FlexList className={styles.statList} variant="center" responsive>
          {stats.map((stat) => (
            <AboutStat key={stat.id} {...stat} />
          ))}
        </FlexList>
      </Container>
    </Section>
  );
}
