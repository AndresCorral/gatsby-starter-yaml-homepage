import '#styles/Styles.css';

import * as React from 'react';

import Home from '#views/Home.view';
import Layout from '#components/layout/Layout.component';
import info from '#data/info.yaml';
import HeadComponent from '#components/head/Head.component';

export const Head = () => <HeadComponent title={info.title} description={info.description} />;

export default function Index() {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}
