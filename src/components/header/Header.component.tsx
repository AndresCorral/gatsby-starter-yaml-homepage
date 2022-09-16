import * as React from 'react';
import { Menu, X } from 'react-feather';
import { graphql, useStaticQuery } from 'gatsby';

import {
  Container,
  Flex,
  FlexList,
  Space,
  NavLink,
  Button,
  InteractiveIcon,
  Nudge,
  VisuallyHidden,
} from '#components/ui/Ui.component';
import sections from '#data/sections.yaml';
import { parseImages } from '#lib/utils/ImageQuery.util';
import info from '#data/info.yaml';
import ImageRenderer from '#components/imageRenderer/ImageRenderer.component';

import {
  mobileNavOverlay,
  mobileNavLink,
  desktopHeaderNavWrapper,
  mobileHeaderNavWrapper,
  mobileNavSVGColorWrapper,
} from './Header.css';

const logoQuery = graphql`
  query GetHeaderLogoImage {
    allFile(filter: {relativeDirectory: {eq: "brand"}}) {
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

export default function Header() {
  const { allFile: { nodes } } = useStaticQuery(logoQuery);
  const [isOpen, setOpen] = React.useState(false);

  const parsedImages = parseImages(nodes);

  const imageProps = { ...info.logo, gatsbyImage: parsedImages[info.logo.name] };

  const { menu, cta } = sections;

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'visible';
    }
  }, [isOpen]);

  return (
    <header>
      <Container className={desktopHeaderNavWrapper}>
        <Space size={2} />
        <Flex variant="spaceBetween">
          <NavLink to="/">
            <VisuallyHidden>Home</VisuallyHidden>
            <ImageRenderer {...imageProps} />
          </NavLink>
          <nav>
            <FlexList gap={4}>
              {menu.map((navItem) => (
                <li key={navItem.id}>
                  <NavLink to={navItem.href}>{navItem.text}</NavLink>
                </li>
              ))}
            </FlexList>
          </nav>
          <div>{cta && <Button to={cta.href}>{cta.text}</Button>}</div>
        </Flex>
      </Container>
      <Container className={mobileHeaderNavWrapper[isOpen ? 'open' : 'closed']}>
        <Space size={2} />
        <Flex variant="spaceBetween">
          <span
            className={
              mobileNavSVGColorWrapper[isOpen ? 'reversed' : 'primary']
            }
          >
            <NavLink to="/">
              <VisuallyHidden>Home</VisuallyHidden>
              <ImageRenderer {...imageProps} />
            </NavLink>
          </span>
          <Flex>
            <Space />
            <div>
              {cta && (
                <Button to={cta.href} variant={isOpen ? 'reversed' : 'primary'}>
                  {cta.text}
                </Button>
              )}
            </div>
            <Nudge right={3}>
              <InteractiveIcon
                title="Toggle menu"
                onClick={() => setOpen(!isOpen)}
                className={
                  mobileNavSVGColorWrapper[isOpen ? 'reversed' : 'primary']
                }
              >
                {isOpen ? <X /> : <Menu />}
              </InteractiveIcon>
            </Nudge>
          </Flex>
        </Flex>
      </Container>
      {isOpen && (
        <div className={mobileNavOverlay}>
          <nav>
            <FlexList responsive variant="stretch">
              {menu.map((navItem) => (
                <li key={navItem.id}>
                  <NavLink to={navItem.href} onClick={() => setOpen(false)} className={mobileNavLink}>
                    {navItem.text}
                  </NavLink>
                </li>
              ))}
            </FlexList>
          </nav>
        </div>
      )}
    </header>
  );
}
