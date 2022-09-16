import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { Testimonial as TestimonialProps, TestimonialList as TestimonialListProps } from '#types/Testimonial.type';
import {
  Container,
  Section,
  Heading,
  Kicker,
  Flex,
  Box,
  FlexList,
  Blockquote,
  Text,
} from '#components/ui/Ui.component';
import ImageRenderer from '#components/imageRenderer/ImageRenderer.component';
import * as styles from '#components/ui/Ui.css';
import { parseImages } from '#lib/utils/ImageQuery.util';

const testimonialQuery = graphql`
  query getTestimonialImages {
    allFile(filter: {relativeDirectory: {eq: "testimonial"}}) {
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

function Testimonial(props: TestimonialProps) {
  const { avatar, quote, source } = props;
  const { allFile: { nodes } } = useStaticQuery(testimonialQuery);
  const parsedImages = parseImages(nodes);

  const imageProps = { ...avatar, gatsbyImage: parsedImages[avatar.name] };

  return (
    <Flex variant="start">
      {avatar && (
        <ImageRenderer {...imageProps} className={styles.avatar} />
      )}
      <Blockquote>
        <Text as="p" variant="lead">
          {quote}
        </Text>
        <figcaption>
          <Text as="cite" bold variant="caps">
            {source}
          </Text>
        </figcaption>
      </Blockquote>
    </Flex>
  );
}

export default function TestimonialList(props: TestimonialListProps) {
  const { heading, testimonials, kicker } = props;

  return (
    <Section>
      <Container>
        <Box center>
          <Heading>
            {kicker && <Kicker>{kicker}</Kicker>}
            {heading}
          </Heading>
        </Box>
        <FlexList gutter={3} variant="start" responsive wrap>
          {testimonials.map((testimonial) => (
            <Box as="li" key={testimonial.id} width="half" padding={3}>
              <Testimonial {...testimonial} />
            </Box>
          ))}
        </FlexList>
      </Container>
    </Section>
  );
}
