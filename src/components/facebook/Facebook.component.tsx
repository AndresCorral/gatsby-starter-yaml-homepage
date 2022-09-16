import React, { SVGAttributes } from 'react';

import { StyledLink } from '#components/globalStyles/Elements.style';

import { StyledFacebook } from './Facebook.style';

function SocialFacebook(props: SVGAttributes<SVGElement>) {
  return (
    <span>
      <StyledFacebook {...props} />
      {' '}
      <StyledLink href="https://www.facebook.com/lepotetcol" target="_blank" rel="noreferrer">
        lepotetcol
      </StyledLink>
    </span>
  );
}

export default SocialFacebook;
