import React, { SVGAttributes } from 'react';

import { StyledLink } from '#components/globalStyles/Elements.style';

import { StyledInstagram } from './Instagram.style';

function SocialInstagram(props: SVGAttributes<SVGElement>) {
  return (
    <span>
      <StyledInstagram {...props} />
      {' '}
      <StyledLink href="https://www.instagram.com/lepotetcol/" target="_blank" rel="noreferrer">
        lepotetcol
      </StyledLink>
    </span>
  );
}

export default SocialInstagram;
