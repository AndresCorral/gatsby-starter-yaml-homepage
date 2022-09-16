import '#styles/Styles.css';

import * as React from 'react';

import * as styles from '#styles/404.css';
import Layout from '#components/layout/Layout.component';
import { Container, Box, Heading, Text, Link, Flex } from '#components/ui/Ui.component';
import HeadComponent from '#components/head/Head.component';

export const Head = () => <HeadComponent title="Not found" description="Not found page" />;

export default function NotFound() {
  return (
    <Layout>
      <Box paddingY={4}>
        <Container>
          <Flex variant="column">
            <Heading variant="mega" className={styles.heading}>
              404
            </Heading>
            <Heading as="h1">Page not found</Heading>
            <Flex variant="column" gap={0}>
              <Text variant="lead" className={styles.text}>
                Sorry! We couldn’t find the page you were looking for.
              </Text>
              <Link to="/" className={styles.link}>
                <span>Back to home</span>
              </Link>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </Layout>
  );
}
