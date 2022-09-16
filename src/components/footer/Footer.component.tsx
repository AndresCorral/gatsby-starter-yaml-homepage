import React from 'react';
import {
  Twitter,
  Twitch,
  Instagram,
  Facebook,
  Youtube,
  GitHub,
} from 'react-feather';
import { graphql, useStaticQuery } from 'gatsby';

import {
  Container,
  Flex,
  FlexList,
  Box,
  Space,
  NavLink,
  Text,
  IconLink,
  VisuallyHidden,
} from '#components/ui/Ui.component';
import info from '#data/info.yaml';
import sections from '#data/sections.yaml';
import { parseImages } from '#lib/utils/ImageQuery.util';
import ImageRenderer from '#components/imageRenderer/ImageRenderer.component';

const logoQuery = graphql`
  query GetFooterLogoImage {
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

const socialMedia = {
  twitter: {
    name: 'Twitter',
    icon: <Twitter />,
  },
  instagram: {
    name: 'Instagram',
    icon: <Instagram />,
  },
  facebook: {
    name: 'Facebook',
    icon: <Facebook />,
  },
  youtube: {
    name: 'YouTube',
    icon: <Youtube />,
  },
  github: {
    name: 'GitHub',
    icon: <GitHub />,
  },
  twitch: { icon: <Twitch /> },
};

const getSocialIcon = (service: string) => socialMedia[service]?.icon;

const getSocialName = (service: string) => socialMedia[service]?.name;

export default function Footer() {
  const { allFile: { nodes } } = useStaticQuery(logoQuery);
  const parsedImages = parseImages(nodes);

  const { socialLinks, copyright, meta, logo } = info;
  const { menu } = sections;
  const imageProps = { ...logo, gatsbyImage: parsedImages[logo.name] };

  return (
    <Box as="footer" paddingY={4}>
      <Container>
        <Flex variant="start" responsive>
          <NavLink to="/">
            <VisuallyHidden>Home</VisuallyHidden>
            <ImageRenderer {...imageProps} />
          </NavLink>
          <Space />
          <FlexList>
            { Object.keys(socialLinks).map((service) => (
              <li key={`${service}`}>
                <IconLink to={socialLinks[service]}>
                  <VisuallyHidden>{getSocialName(service)}</VisuallyHidden>
                  {getSocialIcon(service)}
                </IconLink>
              </li>
            ))}
          </FlexList>
        </Flex>
        <Space size={5} />
        <Flex variant="start" responsive>
          <FlexList variant="start" responsive>
            {
              menu.map((section) => (
                <li key={section.id}>
                  <NavLink to={section.href}>{section.text}</NavLink>
                </li>
              ))
            }
          </FlexList>
          <Space />
          <FlexList>
            {meta.map((link) => (
              <li key={link.id}>
                <NavLink to={link.href}>
                  <Text variant="small">{link.text}</Text>
                </NavLink>
              </li>
            ))}
          </FlexList>
          <Text variant="small">{copyright}</Text>
        </Flex>
      </Container>
      <Space size={3} />
    </Box>
  );
}
