import * as React from 'react';
import TagManager from 'react-gtm-module';

import Header from '#components/header/Header.component';
import Footer from '#components/footer/Footer.component';
import Keys from '#data/keys.yaml';

import { fixedContainer, fixedHeader } from './Layout.css';

if (typeof window !== 'undefined') {
  const tagManagerArgs = { gtmId: Keys.tagManager };

  TagManager.initialize(tagManagerArgs);
}

const Layout: React.FC = (props) => {
  const { children } = props;

  return (
    <>
      <section className={fixedHeader}>
        <Header />
      </section>
      <section className={fixedContainer}>
        {children}
        <Footer />
      </section>
    </>
  );
};

export default Layout;
