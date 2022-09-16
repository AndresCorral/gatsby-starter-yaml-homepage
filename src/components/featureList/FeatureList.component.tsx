import * as React from 'react';

import { Container, Box, Kicker, Heading, Text } from '#components/ui/Ui.component';
import Feature from '#components/feature/Feature.component';
import { FeatureList as FeatureListProps } from '#types/FeatureList.type';

export default function FeatureList(props: FeatureListProps) {
  const { features, heading, kicker, text } = props;

  return (
    <Container width="fullbleed">
      <Box background="muted" radius="large">
        <Box center paddingY={5}>
          <Heading>
            {kicker && <Kicker>{kicker}</Kicker>}
            {heading}
          </Heading>
          {text && <Text>{text}</Text>}
        </Box>
        {features.map((feature, i) => (
          <Feature key={feature.id} {...feature} flip={Boolean(i % 2)} />
        ))}
      </Box>
    </Container>
  );
}
